(function() {
  angular.module('knowYourCircle.share')
    .factory('Share', Share);

  Share.$inject = ['$uibModal', '$http', '$q'];

  function Share($uibModal, $http, $q) {
    var shareFactory = {};

    shareFactory.shareSelectedModalOpen = function(people, size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareSelected_modal.html',
        controller: 'shareSelectedController as modal',
        windowClass: "modal fade",
        size: size,
        resolve: {
          people: function() {
            return people;
          },
          size: function() {
            return size;
          }
        }
      });
    };

    shareFactory.shareGroupsModalOpen = function(groups, size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareGroups_modal.html',
        controller: 'shareGroupsController as modal',
        windowClass: "modal fade",
        size: size,
        resolve: {
          groups: function() {
            return groups;
          },
          size: function() {
            return size;
          }
        }
      });
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