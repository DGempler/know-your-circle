(function() {
  angular.module('knowYourCircle.share')
    .factory('Share', Share);

  Share.$inject = ['$uibModal', '$http', '$q'];

  function Share($uibModal, $http, $q) {
    var shareFactory = {};

    function createModalInstance(fileName, controllerName, size, resolveObject) {
      return $uibModal.open({
        animation: true,
        templateUrl: '/partials/share/' + fileName + '.html',
        controller: controllerName + ' as modal',
        size: size,
        windowClass: "modal fade",
        resolve: resolveObject
      });
    }

    shareFactory.shareSelectedModalOpen = function(people, size) {
      var fileName = '_shareSelected_modal';
      var controllerName = 'shareSelectedController';
      var resolve = {
        people: function() {
          return people;
        },
        size: function() {
          return size;
        }
      };

      createModalInstance(fileName, controllerName, size, resolve);
    };

    shareFactory.shareGroupsModalOpen = function(groups, size) {
      var fileName = '_shareGroups_modal';
      var controllerName = 'shareGroupsController';
      var resolve = {
        groups: function() {
          return groups;
        },
        size: function() {
          return size;
        }
      };

      createModalInstance(fileName, controllerName, size, resolve);
    };

    shareFactory.share = function(payload) {
      var deferred = $q.defer();
      $http.post('/api/share', payload).then(function(user) {
        deferred.resolve(user);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    return shareFactory;
  }
})();