(function() {
  angular.module('memPeeps.groups')
    .factory('GroupFactory', GroupFactory);

    GroupFactory.$inject = ['$uibModal', '$q'];

    function GroupFactory($uibModal, $q) {
      var factory = {};

      factory.openNewGroupModal = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/groups/_group_new_modal.html',
          controller: 'groupNewController as group',
          windowClass: "modal fade",
        });
      };

      return factory;
    }
})();