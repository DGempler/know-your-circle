(function() {
  angular.module('knowYourCircle.people')
    .factory('ShareFactory', ShareFactory);

  ShareFactory.$inject = ['$uibModal', '$http'];

  function ShareFactory($uibModal, $http) {
    var shareFactory = {};

    shareFactory.shareSelectedModalOpen = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareSelected_modal.html',
        controller: 'shareSelectedController as modal',
        windowClass: "modal fade"
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

    shareFactory.shareGroups = function(payload) {
      $http.post('/api/share', payload).then(function(user) {
        console.log(user);
      }, function(error) {
        // ADD ERROR MODAL!
        console.log(error);
      });
    };

    return shareFactory;
  }
})();