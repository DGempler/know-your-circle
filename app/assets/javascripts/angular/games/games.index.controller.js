(function() {
  angular.module('knowYourCircle.games')
    .controller('gamesIndexController', gamesIndexController);

  gamesIndexController.$inject = ['$routeParams', '$uibModal', 'PersonFactory', 'DemoFactory', 'AuthFactory', 'GroupFactory'];

  function gamesIndexController($routeParams, $uibModal, PersonFactory, DemoFactory, AuthFactory, GroupFactory) {
    var vm = this;
    vm.people = {};
    vm.stillWaitingForDB = true;

    if ($routeParams.demo === 'true') {
      DemoFactory.getGuestUserPeople()
        .then(function(people) {
          vm.people.people = people;
          vm.stillWaitingForDB = false;
        })
        .catch(function(people) {
          var message = 'An error occured while loading your people. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    } else {
      PersonFactory.getPeople()
        .then(function(people) {
          vm.people.people = people;
          getGroups();
        })
        .catch(function(people) {
          var message = 'An error occured while loading your people. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
          vm.stillWaitingForDB = false;
        })
        .catch(function(error) {
          var message = 'An error occured while loading your groups. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    }

    vm.open = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/games/_flashcard_modal.html',
        controller: 'gamesFlashcardsController as game',
        resolve: {
          people: function() {
            return vm.people.people;
          },
          groups: function() {
            return vm.groups;
          }
        }
      });
    };
  }
})();