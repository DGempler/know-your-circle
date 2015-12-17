(function() {
  angular.module('memPeeps.groups')
    .controller('groupController', groupController);

    groupController.$inject = ['$uibModalInstance', 'groups', 'GroupFactory'];

    function groupController($uibModalInstance, groups, GroupFactory) {
      var vm = this;
      vm.group = {};
      vm.group.groups = groups;
      vm.stagedForDeletion = {};

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

      vm.stageGroupForDeletion = function(id) {
        vm.stagedForDeletion[id] = !vm.stagedForDeletion[id];
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

      vm.editGroup = function(group) {
        vm.showEditForm = true;
        vm.showNewForm = false;
        vm.group.edit = group;
        vm.group.editName = group.name;
      };

      vm.submitEditGroup = function() {
        if (vm.group.editName !== vm.group.edit.name) {
          GroupFactory.updateGroup(vm.group.edit.id, vm.group.editName)
            .then(function(updatedGroup) {
              vm.group.edit = {};
              vm.group.editName = "";
              vm.group.groups.forEach(function(oldGroup, index) {
                if (oldGroup.id === updatedGroup.id) {
                  vm.group.groups[index] = updatedGroup;
                }
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log('no change!');
        }
      };

    }

})();