(function() {
  angular.module('memPeeps.people')
    .controller('personNewController', personNewController);

  personNewController.$inject = ['PersonFactory', '$location', 'GroupFactory'];

  function personNewController(PersonFactory, $location, GroupFactory) {
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

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          originalGroups = groups;
          vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
          vm.groups = [];
          groups.forEach(function(group) {
            vm.groups.push(group);
          });
          vm.groups.push({name: 'Create a new group'});
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    vm.groupSelected = function() {
      if (vm.chosenGroup.name === 'Create a new group') {
        vm.chosenGroup = "";
        GroupFactory.openGroupModal(originalGroups)
          .then(function(groups) {
            originalGroups = groups;
            vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
            vm.groups = [];
            groups.forEach(function(group) {
              vm.groups.push(group);
            });
            vm.groups.push({name: 'Create a new group'});
          })
          .catch(function() {
            getGroups();
          });
      } else {
        if (vm.person.group_ids.indexOf(vm.chosenGroup.id) === -1) {
          vm.person.group_ids.push(vm.chosenGroup.id);
        }
        vm.chosenGroup = "";
      }
    };

    vm.removeGroup = function(removeId) {
      vm.person.group_ids.forEach(function(groupId, index) {
        if (removeId === groupId) {
          vm.person.group_ids.splice(index, 1);
        }
      });
    };

    // prevent "null" from being sent as a value to server if form field is left blank
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

    vm.submitPerson = function() {
      var cleanedPerson = {person: cleanPersonProps(vm.person)};
      PersonFactory.createWithAttachment(cleanedPerson).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
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