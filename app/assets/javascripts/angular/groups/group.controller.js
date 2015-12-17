(function() {
  angular.module('memPeeps.groups')
    .controller('groupController', groupController);

    groupController.$inject = ['$uibModalInstance', 'groups', 'GroupFactory', 'AuthFactory', '$q'];

    function groupController($uibModalInstance, groups, GroupFactory, AuthFactory, $q) {
      var vm = this;
      vm.group = {};
      vm.group.groups = groups;
      vm.stagedForDeletion = {};

      vm.close = function() {
        $uibModalInstance.close(vm.group.groups);
      };

      vm.submitNewGroup = function() {
        GroupFactory.submitNewGroup(vm.group.new)
          .then(function(data) {
            vm.group.groups.push(data);
            vm.group.new = "";
          })
          .catch(function(err) {
            var message;
            if (err.data && err.data.name) {
              message = err.data.name[0];
            } else {
              message = 'There was an error while creating your group. Please refresh the page to try again.';
            }
            AuthFactory.messageModalOpen(message);
            vm.group.new = "";
          });
      };

      vm.stageGroupForDeletion = function(id) {
        if (vm.stagedForDeletion[id]) {
          delete vm.stagedForDeletion[id];
        } else {
          vm.stagedForDeletion[id] = true;
        }
        if (Object.keys(vm.stagedForDeletion).length !== 0) {
          vm.showDeleteGroupsButton = true;
        } else {
          vm.showDeleteGroupsButton = false;
        }
        vm.showEditForm = false;
        vm.showNewForm = false;
        vm.group.edit = {};
        vm.group.editName = "";
      };

      function cleanGroups(deletedGroupIds, oldGroups) {
        var newGroups = [];
        oldGroups.forEach(function(group) {
          if (deletedGroupIds.indexOf(group.id.toString()) === -1) {
            newGroups.push(group);
          }
        });
        return newGroups;
      }

      vm.deleteGroups = function(id) {
        var promiseArray = [];
        var stagedForDeletionArray = Object.keys(vm.stagedForDeletion);
        stagedForDeletionArray.forEach(function(id) {
          promiseArray.push(GroupFactory.deleteGroup(id));
        });

        $q.all(promiseArray).then(function(groups) {
          vm.group.groups = cleanGroups(stagedForDeletionArray, vm.group.groups);
          vm.showDeleteGroupsButton = false;
        })
        .catch(function(error) {
          var message = 'There was an error while deleting your groups. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
      };

      vm.editGroup = function(group) {
        vm.showEditForm = true;
        vm.showNewForm = false;
        vm.showDeleteGroupsButton = false;
        vm.stagedForDeletion = {};
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
              vm.showEditForm = false;
            })
            .catch(function(error) {
              var message = 'There was an error while changing your group. Please refresh the page to try again.';
              AuthFactory.messageModalOpen(message);
            });
        } else {
          var message = 'Your submitted group name matches the existing one. Please try again.';
          AuthFactory.messageModalOpen(message);
        }
      };

      vm.clickShowNewForm = function() {
        vm.showNewForm = true;
        vm.showEditForm = false;
        vm.showDeleteGroupsButton = false;
        vm.stagedForDeletion = {};
        vm.group.edit = {};
        vm.group.editName = "";
      };

    }

})();