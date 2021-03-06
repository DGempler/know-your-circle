(function() {
  angular.module('knowYourCircle.groups')
    .controller('groupController', groupController);

    groupController.$inject = ['$uibModalInstance', 'groups', 'GroupFactory', 'Message', '$q'];

    function groupController($uibModalInstance, groups, GroupFactory, Message, $q) {
      var vm = this;
      vm.groups = groups;
      vm.stagedForDeletion = {};

      function checkForMatchingGroup(type) {
        var hasMatch = false;
        vm.groups.forEach(function(group) {
          if (vm[type].toLowerCase() === group.name.toLowerCase()) {
            hasMatch = true;
          }
        });
        return hasMatch;
      }

      function newGroupSuccess(data) {
        vm.groups.push(data);
      }

      function newGroupError(err) {
        var message;
        if (err.data && err.data.name) {
          message = err.data.name[0];
        } else {
          message = 'There was an error while creating your group. Please refresh the page to try again.';
        }
        Message.open(message);
      }

      function submitNewGroup() {
        GroupFactory.submitNewGroup(vm.new)
          .then(function(data) {
            newGroupSuccess(data);
          })
          .catch(function(err) {
            newGroupError(err);
          })
          .finally(function() {
            vm.new = "";
            vm.busy = false;
          });
      }

      function groupAlreadyExistsMessage() {
        var message = 'This group already exists.';
        Message.open(message);
      }

      function deleteOrAddStagedForDeletion(id) {
        if (vm.stagedForDeletion[id]) {
          delete vm.stagedForDeletion[id];
        } else {
          vm.stagedForDeletion[id] = true;
        }
      }

      function toggleShowDeleteGroupsStuff() {
        if (Object.keys(vm.stagedForDeletion).length !== 0) {
          vm.showDeleteGroupsButton = true;
        } else {
          vm.showDeleteGroupsButton = false;
        }
        vm.showEditForm = false;
        vm.showNewForm = false;
        vm.edit = {};
        vm.editName = "";
      }

      function cleanGroups(deleteGroupIds) {
        var newGroups = [];
        vm.groups.forEach(function(group) {
          if (deleteGroupIds.indexOf(group.id.toString()) === -1) {
            newGroups.push(group);
          }
        });
        return newGroups;
      }

      function addGroupsToPromiseArray(idArray, promiseArray) {
        idArray.forEach(function(id) {
          promiseArray.push(GroupFactory.deleteGroup(id));
        });
      }

      function errorMessage(type) {
        var message = 'There was an error while ' + type + ' your groups. Please refresh the page to try again.';
        Message.open(message);
      }

      function updateGroupInScope(updatedGroup) {
        vm.groups.forEach(function(oldGroup, index) {
          if (oldGroup.id === updatedGroup.id) {
            vm.groups[index] = updatedGroup;
          }
        });
      }

      function updateGroupSuccess(updatedGroup) {
        vm.edit = {};
        vm.editName = "";
        vm.showEditForm = false;
        updateGroupInScope(updatedGroup);
      }

      function updateGroupError(error) {
        if (error.data && error.data.name) {
          var message = error.data.name[0];
          Message.open(message);
        } else {
          errorMessage('changing');
        }
      }

      function updateGroup() {
        GroupFactory.updateGroup(vm.edit.id, vm.editName)
          .then(function(updatedGroup) {
            updateGroupSuccess(updatedGroup);
          })
          .catch(function(error) {
            updateGroupError(error);
          })
          .finally(function() {
            vm.busy = false;
          });
      }

      vm.close = function() {
        $uibModalInstance.close(vm.groups);
      };

      vm.submitNewGroup = function() {
        var hasMatch = checkForMatchingGroup('new');
        if (!hasMatch) {
          vm.busy = true;
          submitNewGroup();
        } else {
          groupAlreadyExistsMessage();
        }
      };

      vm.stageGroupForDeletion = function(id) {
        deleteOrAddStagedForDeletion(id);
        toggleShowDeleteGroupsStuff();
      };

      vm.deleteGroups = function(id) {
        var promiseArray = [];
        var idArray = Object.keys(vm.stagedForDeletion);
        addGroupsToPromiseArray(idArray, promiseArray);
        vm.groups = cleanGroups(idArray);
        $q.all(promiseArray)
          .then(function(groups) {
            vm.showDeleteGroupsButton = false;
          })
          .catch(function(error) {
            errorMessage('deleting');
          });
      };

      vm.editGroup = function(group) {
        vm.showEditForm = true;
        vm.showNewForm = false;
        vm.showDeleteGroupsButton = false;
        vm.stagedForDeletion = {};
        vm.edit = group;
        vm.editName = group.name;
      };

      vm.submitEditGroup = function() {
        if (vm.editName !== vm.edit.name) {
          var hasMatch = checkForMatchingGroup('editName');
          if (!hasMatch) {
            vm.busy = true;
            updateGroup();
          } else {
            groupAlreadyExistsMessage();
          }
        } else {
          var message = 'Your submitted group name matches the existing one. Please try again.';
          Message.open(message);
        }
      };

      vm.clickShowNewForm = function() {
        vm.showNewForm = true;
        vm.showEditForm = false;
        vm.showDeleteGroupsButton = false;
        vm.stagedForDeletion = {};
        vm.edit = {};
        vm.editName = "";
      };

    }

})();