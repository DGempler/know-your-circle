(function() {
  angular.module('memPeeps.people')
    .controller('personNewController', personNewController);

  personNewController.$inject = ['PersonFactory', '$location', 'GroupFactory'];

  function personNewController(PersonFactory, $location, GroupFactory) {
    var vm = this;
    vm.person = {};
    vm.person.hints = [""];
    vm.person.groups = [];
    var originalGroups;

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          originalGroups = groups;
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
        console.log(vm.chosenGroup);
        vm.person.groups.push(vm.chosenGroup);
        vm.chosenGroup = "";
      }
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