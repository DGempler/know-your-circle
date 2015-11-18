(function() {
  angular.module('memPeeps.people')
    .controller('personEditController', personEditController);

  personEditController.$inject = ['$scope', '$routeParams', '$location', 'PersonFactory'];

  function personEditController($scope, $routeParams, $location, PersonFactory) {
    var originalPerson;
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      originalPerson = person;
      $scope.person = {};
      $scope.person.first_name = person.first_name;
      $scope.person.last_name = person.last_name;
      $scope.person.sex = person.sex;
      $scope.person.nickname = person.nickname;
      $scope.person.middle_name = person.middle_name;
      $scope.person.location = person.location;
      $scope.person.occupation = person.occupation;
      if (person.dob) {
        $scope.person.dob = new Date(person.dob);
      }
      $scope.person.bio = person.bio;
      $scope.person.id = person.id;
      $scope.hints = person.hints;
      if ($scope.hints.length === 0) {
        $scope.hints.push({hint: ''});
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
        originalPerson.hints.forEach(function(orHint) {
          if (value.id) {
            if (orHint.id === value.id) {
              newArray.push(value);
            }
          } else if (value.hint) {
            newArray.push(value);
          }
        });
      });
      return newArray;
    }

    $scope.submitPerson = function() {
      var newObject = {person: checkObjectForNullValues($scope.person), hints: checkArrayForNullValues($scope.hints)};
      PersonFactory.updateWithAttachment(newObject).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

    $scope.addInputFields = function() {
      $scope.addedInputFields = true;
    };

    $scope.addHintInputs = function() {
      if ($scope.hints.length <= 2) {
        $scope.hints.push('');
      }
    };
  }
})();