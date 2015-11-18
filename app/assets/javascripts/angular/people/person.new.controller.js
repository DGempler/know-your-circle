angular.module('memPeeps')
  .controller('personNewController', personNewController);

personNewController.$inject = ['$scope', 'PersonFactory', '$location'];

function personNewController($scope, PersonFactory, $location) {
  $scope.person = {};
  $scope.hints = {};
  $scope.hints = [{hint: ""}];

  function checkObjectForNullValues(object) {
    var newObject = {};
    for (var key in object) {
      if (object[key] || key == 'image') {
        newObject[key] = object[key];
      }
    }
    return newObject;
  }

  function checkArrayForNullValues(array) {
    var newArray = [];
    array.forEach(function(value) {
      if (value.hint) {
        newArray.push(value);
      }
    });
    return newArray;
  }

  $scope.submitPerson = function() {
    var newObject = {person: checkObjectForNullValues($scope.person), hints: checkArrayForNullValues($scope.hints)};
    PersonFactory.createWithAttachment(newObject).then(function(data) {
      $location.path('/people/show/' + data.id);
    });
  };

  $scope.addInputFields = function() {
    $scope.addedInputFields = true;
  };

  $scope.addHintInputs = function() {
    if ($scope.hints.length <= 2) {
      $scope.hints.push({hint: ''});
    }
  };
}