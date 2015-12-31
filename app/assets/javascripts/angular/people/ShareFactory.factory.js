(function() {
  angular.module('knowYourCircle.people')
    .factory('ShareFactory', ShareFactory);

  ShareFactory.$inject = ['$uibModal', '$http'];

  function ShareFactory($uibModal, $http) {
    var shareFactory = {};

    shareFactory.shareSelectedModalOpen = function(people) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareSelected_modal.html',
        controller: 'shareSelectedController as modal',
        windowClass: "modal fade",
        resolve: {
          people: function() {
            return people;
          }
        }
      });
    };

    shareFactory.shareGroupsModalOpen = function(groups) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareGroups_modal.html',
        controller: 'shareGroupsController as modal',
        windowClass: "modal fade",
        size: 'sm',
        resolve: {
          groups: function() {
            return groups;
          }
        }
      });
    };

    shareFactory.share = function(payload) {
      $http.post('/api/share', payload).then(function(user) {
        // ADD SUCCESS RESPONSE
        console.log(user);
      }, function(error) {
        // ADD ERROR MODAL!
        console.log(error);
      });
    };

    return shareFactory;
  }
})();