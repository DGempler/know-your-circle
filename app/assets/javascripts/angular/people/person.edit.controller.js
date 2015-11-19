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
      vm.hints = person.hints;
      if (vm.hints.length === 0) {
        vm.hints.push({hint: ''});
      }
    });

    function checkObjectForNullValues(object) {
      var newObject = {};
      for (var key in object) {
        if ((originalPerson[key] && !object[key]) || object[key]) {
          newObject[key] = object[key];
        }
      }
      return newObject;
    }

    function checkArrayForNullValues(array) {
      var newArray = [];
      array.forEach(function(value) {
        var alreadyPushed = false;
        originalPerson.hints.forEach(function(orHint) {
          if (value.id) {
            if (orHint.id === value.id) {
              newArray.push(value);
              alreadyPushed = true;
            }
          }
        });
        if (value.hint && !alreadyPushed) {
          newArray.push(value);
        }
      });
      return newArray;
    }

    vm.submitPerson = function() {
      var newObject = {person: checkObjectForNullValues(vm.person), hints: checkArrayForNullValues(vm.hints)};
      PersonFactory.updateWithAttachment(newObject).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

    vm.addInputFields = function() {
      vm.addedInputFields = true;
    };

    vm.addHintInputs = function() {
      if (vm.hints.length <= 2) {
        vm.hints.push('');
      }
    };
  }
})();