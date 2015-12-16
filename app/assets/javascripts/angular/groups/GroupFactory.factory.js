(function() {
  angular.module('memPeeps.groups')
    .factory('GroupFactory', GroupFactory);

    GroupFactory.$inject = ['$uibModal', '$q'];

    function GroupFactory($uibModal, $q) {
      var factory = {};

      factory.openNewGroupModal = function(groups) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/groups/_group_new_modal.html',
          controller: 'groupNewController as modal',
          windowClass: "modal fade",
          size: 'sm',
          resolve: {
            groups: function() {
              return groups;
            }
          }
        });
      };

      return factory;
    }
})();