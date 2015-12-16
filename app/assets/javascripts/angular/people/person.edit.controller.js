(function() {
  angular.module('memPeeps.people')
    .controller('personEditController', personEditController);

  personEditController.$inject = ['$routeParams', '$location', 'PersonFactory', 'GroupFactory'];

  function personEditController($routeParams, $location, PersonFactory, GroupFactory) {
    var vm = this;
    var originalPerson;
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
        GroupFactory.openNewGroupModal(originalGroups)
          .then(function(groups) {
            originalGroups = groups;
            vm.person.group_ids = cleanGroupIds(vm.person.group_ids, originalGroups);
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
        // if original person had value, and submitted person doesn't OR sumbitted person now has a value
        if ((originalPerson[key] && !submittedPerson[key]) || submittedPerson[key]) {
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
      PersonFactory.updateWithAttachment(cleanedPerson).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

    vm.addInputFields = function() {
      vm.addedInputFields = true;
    };

    vm.addHintInputs = function() {
      if (vm.person.hints.length <= 2) {
        vm.person.hints.push('');
      }
    };

    PersonFactory.getPerson($routeParams.id).then(function(person) {
      originalPerson = person;
      vm.person = {};
      vm.person.first_name = person.first_name;
      vm.person.last_name = person.last_name;
      vm.person.sex = person.sex;
      vm.person.nickname = person.nickname;
      vm.person.middle_name = person.middle_name;
      vm.person.location = person.location;
      vm.person.occupation = person.occupation;
      if (person.dob) {
        vm.person.dob = new Date(person.dob);
      }
      vm.person.bio = person.bio;
      vm.person.id = person.id;
      vm.person.group_ids = [];
      person.groups.forEach(function(group) {
        vm.person.group_ids.push(group.id);
      });
      vm.person.hints = [];
      person.hints.forEach(function(hint) {
        if (hint) {
          vm.person.hints.push(hint);
        }
      });
      if (vm.person.hints.length === 0) {
        vm.person.hints.push("");
      }
      getGroups();
    });

  }
})();