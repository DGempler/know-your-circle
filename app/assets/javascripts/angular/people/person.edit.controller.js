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
      for (var prop in person) {
        if (prop !== 'dob') {
          vm.person[prop] = person[prop];
        }
      }
      if (person.dob) {
        vm.person.dob = new Date(person.dob);
      }
      if (vm.person.hints.length === 0) {
        vm.person.hints.push("");
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

    /*function checkArrayForNullValues(array) {
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
    }*/

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
      if (vm.hints.length <= 2) {
        vm.hints.push('');
      }
    };
  }
})();