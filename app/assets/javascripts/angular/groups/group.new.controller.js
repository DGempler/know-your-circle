(function() {
  angular.module('memPeeps.groups')
    .controller('groupNewController', groupNewController);

    groupNewController.$inject = ['$uibModalInstance', 'groups', 'GroupFactory'];

    function groupNewController($uibModalInstance, groups, GroupFactory) {
      var vm = this;
      vm.group = {};
      vm.group.groups = groups;

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.submitNewGroup = function() {
        console.log('submited new group ' + vm.group.new);
        // GroupFactory.submitNewGroup(vm.group.new);
      };


    }

})();