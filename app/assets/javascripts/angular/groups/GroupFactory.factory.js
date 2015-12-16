(function() {
  angular.module('memPeeps.groups')
    .factory('GroupFactory', GroupFactory);

    GroupFactory.$inject = ['$uibModal', '$q'];

    function GroupFactory($uibModal, $q) {
      var factory = {};

      factory.openNewGroupModal = function() {
        console.log('ha ha open!');
      };

      return factory;
    }
})();