(function() {
  angular.module('memPeeps.games')
    .controller('gamesFlashcardsController', gamesFlashcardsController);

  gamesFlashcardsController.$inject = ['$uibModalInstance', 'people'];

  function gamesFlashcardsController($uibModalInstance, people) {
    var vm = this;
    vm.person = {};
    vm.person.guessPerson = {};
    vm.game = {};
    vm.game.roundScore = 5;
    vm.game.totalScore = 0;
    vm.game.totalPossibleScore = 0;
    vm.game.scoreMessage = "Max Round Score:";
    var otherHintsShown = [];
    vm.game.hintCount = 0;
    var randomNumber = Math.floor(Math.random() * people.length);
    vm.person.randomPerson = people[randomNumber];

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
      vm.person.firstNameWrong = false;
      vm.person.lastNameWrong = false;
      vm.person.firstNameRight = false;
      vm.person.lastNameRight = false;
      vm.person.result = false;
      vm.person.guessPerson = {};
      vm.person.randomPerson = people[chooseNewRandomNumber()];
      vm.game.scoreMessage = "Max Round Score:";
      vm.game.roundScore = 5;
      vm.game.hintCount = 0;
    }


    vm.submitPerson = function() {
      var scoredThisRound = 0;

      function correctGuessResult(typeRight) {
        vm.person[typeRight] = true;
        vm.person.result = true;
        vm.game.totalScore += (vm.game.roundScore / 2);
        scoredThisRound += (vm.game.roundScore / 2);
      }

      function checkGuess(guessType, typeRightWrong) {
        var guessedName;
        if (vm.person.guessPerson[guessType]) {
          guessedName = vm.person.guessPerson[guessType].toLowerCase();
        }
        if (guessedName === vm.person.randomPerson[guessType].toLowerCase()) {
          correctGuessResult(typeRightWrong + 'Right');
        } else {
          vm.person.result = true;
          vm.person[typeRightWrong + 'Wrong'] = true;
        }
      }

      checkGuess('first_name', 'firstName');
      checkGuess('last_name', 'lastName');

      vm.game.scoreMessage = "Scored this round:";
      vm.game.roundScore = scoredThisRound;
      prepNextGameRound();

    };

    vm.game.hintFirstLetterFirstName = function() {
      showHint();
      vm.game.firstNameHintView = true;
      vm.game.firstNameHintText = "This person's first name starts with:";
      vm.game.firstNameHint = vm.person.randomPerson.first_name[0];
    };

    vm.game.hintFirstLetterLastName = function() {
      showHint();
      vm.game.lastNameHintView = true;
      vm.game.lastNameHintText = "This person's last name starts with:";
      vm.game.lastNameHint = vm.person.randomPerson.last_name[0];
    };

    vm.game.hintNickname = function(nameType) {
      if (nameType === 'firstNameHint') {
        vm.game.firstNameHintView = true;
      } else {
        vm.game.lastNameHintView = true;
      }
      showHint();
      vm.game[nameType + "Text"] = "This person's nickname is:";
      vm.game[nameType] = vm.person.randomPerson.nickname;
    };

    vm.game.hintOther = function(nameType) {
      if (nameType === 'firstNameHint') {
        vm.game.firstNameHintView = true;
      } else {
        vm.game.lastNameHintView = true;
      }
      var randomHintIndex;
      showHint();
      if (otherHintsShown.length === vm.person.randomPerson.hints.length) {
        otherHintsShown = [];
      }
      var otherHintsLength = vm.person.randomPerson.hints.length;
      if (otherHintsLength !== 1) {
        randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        while (otherHintsShown.indexOf(randomHintIndex) !== -1) {
          randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        }
      } else {
        randomHintIndex = 0;
      }
      otherHintsShown.push(randomHintIndex);
      vm.game[nameType + "Text"] = vm.person.randomPerson.hints[randomHintIndex].hint;
    };

    vm.game.closeFirstNameHint = function() {
      vm.game.firstNameHintView = false;
    };

    vm.game.closeLastNameHint = function() {
      vm.game.lastNameHintView = false;
    };

    function showHint() {
      clearHintText();
      vm.game.hintsShown = true;
      vm.game.roundScore--;
      vm.game.hintCount++;
    }

    function prepNextGameRound (reset) {
      clearHintText();
      vm.game.firstNameHintView = false;
      vm.game.lastNameHintView = false;
      vm.game.hintsShown = false;
      otherHintsShown = [];
      hintCount = 0;
      if (!reset) {
        vm.game.totalPossibleScore += 5;
      }
      vm.game.scorePercentage = vm.game.totalScore / vm.game.totalPossibleScore;
    }

    function clearHintText() {
      vm.game.firstNameHintText = "";
      vm.game.firstNameHint = "";
      vm.game.lastNameHintText = "";
      vm.game.lastNameHint = "";
    }

    vm.next = function() {
      next();
    };

    vm.quit = function () {
      $uibModalInstance.close();
    };

    vm.reset = function () {
      prepNextGameRound(true);
      next();
      vm.game.totalScore = 0;
      vm.game.totalPossibleScore = 0;
      vm.game.scorePercentage = vm.game.totalScore / vm.game.totalPossibleScore;
    };
  }
})();