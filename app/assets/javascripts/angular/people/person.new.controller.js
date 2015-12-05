(function() {
  angular.module('memPeeps.people')
    .controller('personNewController', personNewController);

  personNewController.$inject = ['PersonFactory', '$location'];

  function personNewController(PersonFactory, $location) {
    var vm = this;
    vm.person = {};
    vm.person.hints = [""];

    function checkObjectForNullValues(object) {
      var newObject = {};
      for (var key in object) {
        if (object[key] || key == 'image') {
          newObject[key] = object[key];
        }
      }
      return newObject;
    }

    /*function checkArrayForNullValues(array) {
      var newArray = [];
      array.forEach(function(value) {
        if (value.hint) {
          newArray.push(value);
        }
      });
      return newArray;
    }*/

    vm.submitPerson = function() {
      var newObject = {person: checkObjectForNullValues(vm.person)};
      PersonFactory.createWithAttachment(newObject).then(function(data) {
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