(function() {
  angular.module('knowYourCircle.games')
    .controller('gamesFlashcardsController', gamesFlashcardsController);

  gamesFlashcardsController.$inject = ['$uibModalInstance', 'people', 'groups'];

  function gamesFlashcardsController($uibModalInstance, people, groups) {
    var vm = this;
    var selectedPeople;
    vm.selected = {};
    vm.person = {};
    vm.game = {};
    vm.clickOr = "Click";
    scoredThisRound = 0;
    gamePeople = [];
    var otherHintsShown = [];
    var randomNumber;

    function zeroOutTotalScores() {
      vm.game.totalScore = 0;
      vm.game.totalPossibleScore = 0;
    }

    function setRndPersonAndGameProps(randNum) {
      vm.person.randomPerson = gamePeople[randNum];
      gamePeople.splice(randNum, 1);
      vm.game.roundScore = 5;
      vm.game.hintCount = 0;
      vm.game.scoreMessage = "Max Round Score:";
    }

    function setUpGame() {
      randomNumber = Math.floor(Math.random() * gamePeople.length);
      vm.choosingPeople = false;
      vm.person.guessPerson = {};
      zeroOutTotalScores();
      setUpGamePeople();
      setRndPersonAndGameProps(randomNumber);
    }

    function next() {
      vm.person.firstNameWrong = false;
      vm.person.lastNameWrong = false;
      vm.person.firstNameRight = false;
      vm.person.lastNameRight = false;
      vm.person.result = false;
      vm.person.guessPerson = {};
      if (gamePeople.length === 0) {
        setUpGamePeople();
      }
      chooseNewRandomNumber();
      setRndPersonAndGameProps(randomNumber);
    }

    function setUpGamePeople() {
      selectedPeople.forEach(function(person) {
        gamePeople.push(person);
      });
    }

    function chooseNewRandomNumber() {
      var newRandomNumber = Math.floor(Math.random() * gamePeople.length);
      randomNumber = newRandomNumber;
    }

    function clearNoPeopleProps() {
      vm.noPeopleInGroup = "";
      vm.addSomePeople = "";
      vm.clickOr = "Click";
    }

    function setNoPeopleProps() {
      vm.noPeopleInGroup = "in the selected groups";
      vm.addSomePeople = "people";
      vm.clickOr = "or";
      vm.selected = {};
    }

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

    function getHint(camelCase, english, snake_case) {
      showHint();
      vm.game[camelCase + 'HintView'] = true;
      vm.game[camelCase + 'HintText'] = "This person's " + english + " starts with:";
      vm.game[camelCase + 'Hint'] = vm.person.randomPerson[snake_case][0];
    }

    function addPeopleWithSelectedGroups(selectedGroups, selectedPeople) {
      people.forEach(function(person) {
        person.groups.forEach(function(group) {
          if ((selectedGroups.indexOf(group.name) !== -1) && selectedPeople.indexOf(person) === -1) {
            selectedPeople.push(person);
          }
        });
      });
    }

    function determineFirstOrLastNameHint(nameType) {
      if (nameType === 'firstNameHint') {
        vm.game.firstNameHintView = true;
      } else {
        vm.game.lastNameHintView = true;
      }
    }

    function showHint() {
      clearHintText();
      vm.game.hintsShown = true;
      vm.game.roundScore--;
      vm.game.hintCount++;
    }

    function prepNextGameRound(reset) {
      clearHintText();
      vm.game.firstNameHintView = false;
      vm.game.lastNameHintView = false;
      vm.game.hintsShown = false;
      otherHintsShown = [];
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

    function clearOtherHintsShownIfAllShown() {
      if (otherHintsShown.length === vm.person.randomPerson.hints.length) {
        otherHintsShown = [];
      }
    }

    function getRandomHintIndex(otherHintsLength) {
      var randomHintIndex;
      if (otherHintsLength !== 1) {
        randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        while (otherHintsShown.indexOf(randomHintIndex) !== -1) {
          randomHintIndex = Math.floor(Math.random() * otherHintsLength);
        }
      } else {
        randomHintIndex = 0;
      }
      otherHintsShown.push(randomHintIndex);
      return randomHintIndex;
    }

    vm.playAllPeople = function() {
      clearNoPeopleProps();
      selectedPeople = people;
      setUpGame();
    };

    vm.selectGroup = function(name) {
      if (vm.selected[name]) {
        delete vm.selected[name];
      } else {
        vm.selected[name] = true;
      }
    };

    vm.playByGroups = function() {
      var selectedGroups = Object.keys(vm.selected);
      selectedPeople = [];
      clearNoPeopleProps();
      addPeopleWithSelectedGroups(selectedGroups, selectedPeople);
      setUpGame();
      if (selectedPeople.length === 0) {
        setNoPeopleProps();
      }
    };

    vm.submitPerson = function() {
      scoredThisRound = 0;
      checkGuess('first_name', 'firstName');
      checkGuess('last_name', 'lastName');
      vm.game.scoreMessage = "Scored this round:";
      vm.game.roundScore = scoredThisRound;
      prepNextGameRound();
    };

    vm.game.hintFirstLetterFirstName = function() {
      getHint('firstName', 'first name', 'first_name');
    };

    vm.game.hintFirstLetterLastName = function() {
      getHint('lastName', 'last name', 'last_name');
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
      var randomHintIndex;
      var otherHintsLength = vm.person.randomPerson.hints.length;
      determineFirstOrLastNameHint(nameType);
      showHint();
      clearOtherHintsShownIfAllShown();
      randomHintIndex = getRandomHintIndex(otherHintsLength);
      vm.game[nameType + "Text"] = vm.person.randomPerson.hints[randomHintIndex];
    };

    vm.game.closeFirstNameHint = function() {
      vm.game.firstNameHintView = false;
    };

    vm.game.closeLastNameHint = function() {
      vm.game.lastNameHintView = false;
    };

    vm.next = function() {
      next();
    };

    vm.quit = function () {
      $uibModalInstance.close();
    };

    vm.reset = function () {
      prepNextGameRound(true);
      next();
      zeroOutTotalScores();
      vm.game.scorePercentage = vm.game.totalScore / vm.game.totalPossibleScore;
    };

    if (!groups || groups.length === 0) {
      vm.choosingPeople = false;
      vm.playAllPeople();
    } else {
      vm.choosingPeople = true;
      vm.groups = groups;
    }
  }
})();