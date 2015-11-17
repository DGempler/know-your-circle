angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {
  }])
  .controller('peopleIndexController', ['$scope', 'PersonFactory', '$q', function($scope, PersonFactory, $q) {
    $scope.people = {};

    function getPeople() {
      PersonFactory.getPeople().then(function(people) {
        $scope.people.people = people;
      });
    }

    function deleteSelected() {
      var promiseArray = [];
      angular.forEach($scope.people.people, function(person) {
        if (person.selected) {
          promiseArray.push(PersonFactory.deletePerson(person.id));
        }
      });
      $q.all(promiseArray).then(function(people) {
        getPeople();
      });
    }
    $scope.selectAll = function(bool) {
      if (bool) {
        $scope.people.someoneSelected = true;
        angular.forEach($scope.people.people, function(person) {
          person.selected = true;
        });
      } else {
        $scope.people.someoneSelected = false;
        angular.forEach($scope.people.people, function(person) {
          person.selected = false;
        });
      }
    };

    $scope.personSelected = function() {
      var selected = false;
      angular.forEach($scope.people.people, function(person) {
        if (person.selected) {
          selected = true;
        }
      });
      $scope.people.someoneSelected = selected;
    };

    $scope.clickDelete = function() {
      var confirmDelete = window.confirm("Are you sure?");
      if (confirmDelete) {
        deleteSelected();
      }
    };

    getPeople();

  }])
  .controller('personNewController', ['$scope', 'PersonFactory', '$location', function($scope, PersonFactory, $location) {
    $scope.person = {};
    $scope.hints = {};
    $scope.hints = [""];

    function checkObjectForNullValues(object) {
      var newObject = {};
      for (var key in object) {
        if ($scope.person[key]) {
          newObject[key] = object[key];
        }
      }
      return newObject;
    }

    function checkArrayForNullValues(array) {
      var newArray = [];
      array.forEach(function(value) {
        if (value) {
          newArray.push(value);
        }
      });
      return newArray;
    }

    $scope.submitPerson = function() {
      var newObject = {person: checkObjectForNullValues($scope.person), hints: checkArrayForNullValues($scope.hints)};
      // var hintsArray = checkArrayForNullValues($scope.hints);
      // if (hintsArray.length !== 0) {
      //   newObject.hints = hintsArray;
      // }
      PersonFactory.createWithAttachment(newObject).then(function(data) {
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
  }])
  .controller('personShowController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      $scope.person = person;
    });

    $scope.deletePerson = function() {
      PersonFactory.deletePerson($routeParams.id).then(function(person) {
        if (person) {
          $location.path('/people/index');
        }
      });
    };
  }])
  .controller('personEditController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      $scope.person = person;
    });

    $scope.submitPerson = function() {
      PersonFactory.updateWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

  }])
  .controller('gamesIndexController', ['$scope', '$uibModal', 'PersonFactory', function($scope, $uibModal, PersonFactory) {
    $scope.people = {};

    PersonFactory.getPeople().then(function(people) {
      $scope.people.people = people;
    });

    $scope.open = function () {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/games/_flashcard_modal.html',
        controller: 'gamesFlashcardsController',
        resolve: {
          people: function () {
            return $scope.people.people;
          }
        }
      });
    };

  }])
  .controller('gamesFlashcardsController', ['$scope', '$uibModalInstance', 'people', function ($scope, $uibModalInstance, people) {
    $scope.person = {};
    $scope.person.guessPerson = {};
    var randomNumber = Math.floor(Math.random() * people.length);
    $scope.person.randomPerson = people[randomNumber];

    function chooseNewRandomNumber() {
      var newRandomNumber = Math.floor(Math.random() * people.length);
      if (newRandomNumber !== randomNumber) {
        randomNumber = newRandomNumber;
        return randomNumber;
      } else {
        return chooseNewRandomNumber();
      }
    }

    function next() {
      $scope.person.firstNameWrong = false;
      $scope.person.lastNameWrong = false;
      $scope.person.firstNameRight = false;
      $scope.person.lastNameRight = false;
      $scope.person.result = false;
      $scope.person.guessPerson = {};
      $scope.person.randomPerson = people[chooseNewRandomNumber()];
    }


    $scope.submitPerson = function() {
      if ($scope.person.guessPerson.first_name === $scope.person.randomPerson.first_name) {
        $scope.person.result = true;
        $scope.person.firstNameRight = true;
      } else {
        $scope.person.result = true;
        $scope.person.firstNameWrong = true;
      }
      if ($scope.person.guessPerson.last_name === $scope.person.randomPerson.last_name) {
        $scope.person.result = true;
        $scope.person.lastNameRight = true;
      } else {
        $scope.person.result = true;
        $scope.person.lastNameWrong = true;
      }
    };

    $scope.skip = function() {
      next();
    };

    $scope.next = function() {
      next();
    };

    $scope.done = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

