(function() {
  angular.module('memPeeps.people')
    .controller('personEditController', personEditController);

  personEditController.$inject = ['$routeParams', '$location', 'PersonFactory'];

  function personEditController($routeParams, $location, PersonFactory) {
    var vm = this;
    var originalPerson;
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
      vm.person.hints = person.hints;
      if (vm.person.hints.length === 0) {
        vm.person.hints.push("");
      }
    });

    function checkObjectForNullValues(submittedPerson) {
      var newPersonObject = {};
      for (var key in submittedPerson) {
        if ((originalPerson[key] && !submittedPerson[key]) || submittedPerson[key]) {
          newPersonObject[key] = submittedPerson[key];
        }
      }
      return newPersonObject;
    }

    vm.submitPerson = function() {
      var newObject = {person: checkObjectForNullValues(vm.person)};
      PersonFactory.updateWithAttachment(newObject).then(function(data) {
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
  }
})();