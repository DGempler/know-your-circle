(function() {
  angular.module('knowYourCircle.games')
    .controller('gamesIndexController', gamesIndexController);

  gamesIndexController.$inject = ['$routeParams', '$uibModal', 'PersonFactory', 'DemoFactory', 'AuthFactory'];

  function gamesIndexController($routeParams, $uibModal, PersonFactory, DemoFactory, AuthFactory) {
    var vm = this;
    vm.people = {};

    if ($routeParams.demo) {
      DemoFactory.getGuestUserPeople()
        .then(function(people) {
          vm.people.people = people;
        })
        .catch(function(people) {
          var message = 'An error occured while loading your people. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    } else {
      PersonFactory.getPeople()
        .then(function(people) {
          vm.people.people = people;
        })
        .catch(function(people) {
          var message = 'An error occured while loading your people. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    }


    vm.open = function () {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/games/_flashcard_modal.html',
        controller: 'gamesFlashcardsController as game',
        resolve: {
          people: function () {
            return vm.people.people;
          }
        }
      });
    };
  }
})();