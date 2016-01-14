(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleNewController', peopleNewController);

  peopleNewController.$inject = ['PersonFactory', '$location', 'GroupFactory', 'Message'];

  function peopleNewController(PersonFactory, $location, GroupFactory, Message) {
    var vm = this;
    vm.person = {};
    vm.person.hints = [""];
    vm.person.group_ids = [];
    var originalGroups;

    function cleanGroupIds(groupIds, allGroups) {
      var newGroupIds = [];
      allGroups.forEach(function(group) {
        if (groupIds.indexOf(group.id) !== -1) {
          newGroupIds.push(group.id);
        }
      });
      return newGroupIds;
    }

    function copyGroups(groups) {
      originalGroups = groups;
      vm.groups = [];
      groups.forEach(function(group) {
        vm.groups.push(group);
      });
    }

    function errorMessage(type) {
      var message = 'An error occured while ' + type + '. Please refresh the page to try again.';
      Message.open(message);
    }

    function getGroupsSuccess(groups) {
      copyGroups(groups);
      vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          getGroupsSuccess(groups);
        })
        .catch(function(error) {
          errorMessage('loading your groups');
        });
    }

    function removeNullValues(submittedPerson, newPerson) {
      for (var key in submittedPerson) {
        if (submittedPerson[key] || key == 'image') {
          newPerson[key] = submittedPerson[key];
        }
      }
    }

    function removeEmptyHints(submittedPerson, newPerson) {
      var tempArray = [];
      submittedPerson.hints.forEach(function(hint) {
        if (hint) {
          tempArray.push(hint);
        }
      });
      newPerson.hints = tempArray;
    }

    function cleanPersonProps(submittedPerson) {
      var newPerson = {};
      removeNullValues(submittedPerson, newPerson);
      removeEmptyHints(submittedPerson, newPerson);
      return newPerson;
    }

    function cleanAndUpdatePerson() {
      var cleanedPerson = {person: cleanPersonProps(vm.person)};
      PersonFactory.createWithAttachment(cleanedPerson)
        .then(function(data) {
          $location.path('/people/show/' + data.id);
        })
        .catch(function(error) {
          errorMessage('submitting your person');
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    vm.createGroup = function() {
      GroupFactory.openGroupModal(originalGroups)
        .then(function(groups) {
          getGroupsSuccess(groups);
        })
        .catch(function() {
          getGroups();
        });
    };

    vm.applyGroup = function(group) {
      if (vm.person.group_ids.indexOf(group.id) === -1) {
        vm.person.group_ids.push(group.id);
      }
    };

    vm.removeGroup = function(removeId) {
      //splice inside of iteration OK here because it only happens once
      for (var i = 0; i < vm.person.group_ids.length; i++) {
        if (removeId === vm.person.group_ids[i]) {
          vm.person.group_ids.splice(i, 1);
          break;
        }
      }
    };

    vm.submitPerson = function(isValid) {
      if (isValid) {
        vm.busy = true;
        cleanAndUpdatePerson();
      }
    };

    vm.addInputFields = function() {
      vm.addedInputFields = true;
    };

    vm.addHintInputs = function() {
      if (vm.person.hints.length <= 2) {
        vm.person.hints.push("");
      }
    };

    getGroups();

  }
})();