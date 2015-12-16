(function() {
  angular.module('memPeeps.people')
    .controller('personNewController', personNewController);

  personNewController.$inject = ['PersonFactory', '$location', 'GroupFactory'];

  function personNewController(PersonFactory, $location, GroupFactory) {
    var vm = this;
    vm.person = {};
    vm.person.hints = [""];
    vm.person.groups = ['friends', 'enemies'];
    vm.person.groups.push('Create a new group');

    vm.getGroup = function() {
      if (vm.person.group === 'Create a new group') {
        GroupFactory.openNewGroupModal();
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
  }
})();