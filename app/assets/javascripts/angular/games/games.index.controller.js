(function() {
  angular.module('memPeeps.games')
    .controller('gamesIndexController', gamesIndexController);

  gamesIndexController.$inject = ['$uibModal', 'PersonFactory'];

  function gamesIndexController($uibModal, PersonFactory) {
    var vm = this;
    vm.people = {};

    PersonFactory.getPeople().then(function(people) {
      vm.people.people = people;
    });

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