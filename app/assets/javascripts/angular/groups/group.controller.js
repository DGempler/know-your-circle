(function() {
  angular.module('memPeeps.groups')
    .controller('groupController', groupController);

    groupController.$inject = ['$uibModalInstance', 'groups', 'GroupFactory'];

    function groupController($uibModalInstance, groups, GroupFactory) {
      var vm = this;
      vm.group = {};
      vm.group.groups = groups;

      vm.close = function() {
        // $uibModalInstance.close(vm.group.groups);
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
            vm.group.groups.forEach(function(orGroup, index) {
              if (group.id === orGroup.id) {
                vm.group.groups.splice(index, 1);
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      };

      vm.editGroup = function(id) {
        console.log(id);
      }


    }

})();