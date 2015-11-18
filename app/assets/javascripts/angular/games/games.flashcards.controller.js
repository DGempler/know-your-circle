angular.module('memPeeps')
  .controller('gamesFlashcardsController', gamesFlashcardsController);

gamesFlashcardsController.$inject = ['$scope', '$uibModalInstance', 'people'];

function gamesFlashcardsController($scope, $uibModalInstance, people) {
  $scope.person = {};
  $scope.person.guessPerson = {};
  $scope.game = {};
  $scope.game.roundScore = 5;
  $scope.game.totalScore = 0;
  $scope.game.totalPossibleScore = 0;
  $scope.game.scoreMessage = "Max Round Score:";
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
    $scope.game.scoreMessage = "Max Round Score:";
    $scope.game.roundScore = 5;
    $scope.game.hintCount = 0;
  }


  $scope.submitPerson = function() {
    var scoredThisRound = 0;
    if ($scope.person.guessPerson.first_name) {
      var guessedFirstName = $scope.person.guessPerson.first_name.toLowerCase();
    }
    if (guessedFirstName === $scope.person.randomPerson.first_name.toLowerCase()) {
      $scope.person.result = true;
      $scope.person.firstNameRight = true;
      $scope.game.totalScore += ($scope.game.roundScore / 2);
      scoredThisRound += ($scope.game.roundScore / 2);
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
      scoredThisRound += ($scope.game.roundScore / 2);
    } else {
      $scope.person.result = true;
      $scope.person.lastNameWrong = true;
    }
    $scope.game.scoreMessage = "Scored this round:";
    $scope.game.roundScore = scoredThisRound;
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

  function prepNextGameRound (reset) {
    $scope.game.firstNameHintView = false;
    $scope.game.lastNameHintView = false;
    $scope.game.hintsShown = false;
    $scope.game.firstNameHintText = "";
    $scope.game.firstNameHint = "";
    $scope.game.lastNameHintText = "";
    $scope.game.lastNameHint = "";
    otherHintsShown = [];
    hintCount = 0;
    if (!reset) {
      $scope.game.totalPossibleScore += 5;
    }
    $scope.game.scorePercentage = $scope.game.totalScore / $scope.game.totalPossibleScore;
  }

  $scope.skip = function() {
    next();
  };

  $scope.next = function() {
    next();
  };

  $scope.quit = function () {
    $uibModalInstance.close();
  };

  $scope.reset = function () {
    prepNextGameRound(true);
    next();
    $scope.game.totalScore = 0;
    $scope.game.totalPossibleScore = 0;
    $scope.game.scorePercentage = $scope.game.totalScore / $scope.game.totalPossibleScore;
  };
}