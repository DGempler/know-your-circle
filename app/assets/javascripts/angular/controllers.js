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
        $scope.people.someoneSelected = false;
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
    $scope.hints = [{hint: ""}];

    function checkObjectForNullValues(object) {
      var newObject = {};
      for (var key in object) {
        if ($scope.person[key] || key == 'image') {
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
      $scope.person = {};
      $scope.person.first_name = person.first_name;
      $scope.person.last_name = person.last_name;
      $scope.person.sex = person.sex;
      $scope.person.nickname = person.nickname;
      $scope.person.middle_name = person.middle_name;
      $scope.person.location = person.location;
      $scope.person.occupation = person.occupation;
      $scope.person.dob = new Date(person.dob);
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
        if ($scope.person[key] || key == 'image') {
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
    $scope.game = {};
    $scope.game.roundScore = 5;
    $scope.game.totalScore = 0;
    $scope.game.totalPossibleScore = 0;
    var otherHintsShown = [];
    $scope.game.hintCount = 0;
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
      if ($scope.person.guessPerson.first_name) {
        var guessedFirstName = $scope.person.guessPerson.first_name.toLowerCase();
      }
      if (guessedFirstName === $scope.person.randomPerson.first_name.toLowerCase()) {
        $scope.person.result = true;
        $scope.person.firstNameRight = true;
         $scope.game.totalScore += ($scope.game.roundScore / 2);
      } else {
        $scope.person.result = true;
        $scope.person.firstNameWrong = true;
      }
      if ($scope.person.guessPerson.last_name) {
        var guessedLastName = $scope.person.guessPerson.last_name.toLowerCase();
      }
      if (guessedLastName === $scope.person.randomPerson.last_name.toLowerCase()) {
        $scope.person.result = true;
        $scope.person.lastNameRight = true;
        $scope.game.totalScore += ($scope.game.roundScore / 2);
      } else {
        $scope.person.result = true;
        $scope.person.lastNameWrong = true;
      }
      prepNextGameRound();
    };

    $scope.game.hintFirstLetterFirstName = function() {
      showHint();
      $scope.game.firstNameHintView = true;
      $scope.game.firstNameHintText = "This person's first name starts with:";
      $scope.game.firstNameHint = $scope.person.randomPerson.first_name[0];
    };

    $scope.game.hintFirstLetterLastName = function() {
      showHint();
      $scope.game.lastNameHintView = true;
      $scope.game.lastNameHintText = "This person's last name starts with:";
      $scope.game.lastNameHint = $scope.person.randomPerson.last_name[0];
    };

    $scope.game.hintNickname = function(nameType) {
      if (nameType === 'firstNameHint') {
        $scope.game.firstNameHintView = true;
      } else {
        $scope.game.lastNameHintView = true;
      }
      showHint();
      $scope.game[nameType + "Text"] = "This person's nickname is:";
      $scope.game[nameType] = $scope.person.randomPerson.nickname;
    };

    $scope.game.hintOther = function(nameType) {
      if (nameType === 'firstNameHint') {
        $scope.game.firstNameHintView = true;
      } else {
        $scope.game.lastNameHintView = true;
      }
      var randomHintIndex;
      showHint();
      if (otherHintsShown.length === $scope.person.randomPerson.hints.length) {
        otherHintsShown = [];
      }
      var otherHintsLength = $scope.person.randomPerson.hints.length;
      if (otherHintsLength !== 1) {
        randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        while (otherHintsShown.indexOf(randomHintIndex) !== -1) {
          randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        }
      } else {
        randomHintIndex = 0;
      }
      otherHintsShown.push(randomHintIndex);
      $scope.game[nameType + "Text"] = $scope.person.randomPerson.hints[randomHintIndex].hint;
    };

    $scope.game.closeFirstNameHint = function() {
      $scope.game.firstNameHintView = false;
    };

    $scope.game.closeLastNameHint = function() {
      $scope.game.lastNameHintView = false;
    };

    function showHint() {
      $scope.game.firstNameHintText = "";
      $scope.game.firstNameHint = "";
      $scope.game.lastNameHintText = "";
      $scope.game.lastNameHint = "";
      $scope.game.hintsShown = true;
      $scope.game.roundScore--;
      $scope.game.hintCount++;
    }

    function prepNextGameRound () {
      $scope.game.hintCount = 0;
      $scope.game.firstNameHintView = false;
      $scope.game.lastNameHintView = false;
      $scope.game.hintsShown = false;
      $scope.game.totalPossibleScore += 5;
      $scope.game.roundScore = 5;
      $scope.game.firstNameHintText = "";
      $scope.game.firstNameHint = "";
      $scope.game.lastNameHintText = "";
      $scope.game.lastNameHint = "";
      otherHintsShown = [];
      hintCount = 0;
    }

    $scope.skip = function() {
      next();
    };

    $scope.next = function() {
      next();
    };

    $scope.close = function () {
      $uibModalInstance.close();
    };

    $scope.reset = function () {
      $uibModalInstance.dismiss('cancel');
    };



  }]);

