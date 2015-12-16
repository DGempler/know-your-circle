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
        GroupFactory.submitNewGroup(vm.group.new)
          .then(function(data) {
            vm.group.groups.push(data);
            vm.group.new = "";
          })
          .catch(function(err) {
            console.log(err);
            vm.group.new = "";
          });
      };

      vm.deleteGroup = function(id) {
        GroupFactory.deleteGroup(id)
          .then(function(group) {
            vm.groups.groups.forEach(function(orGroup, index) {
              if (group.id === orGroup.id) {
                vm.groups.groups.splice(index, 1);
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      };


    }

})();