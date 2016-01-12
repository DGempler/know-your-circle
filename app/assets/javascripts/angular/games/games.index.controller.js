(function() {
  angular.module('knowYourCircle.games')
    .controller('gamesIndexController', gamesIndexController);

  gamesIndexController.$inject = ['$routeParams', '$uibModal', 'PersonFactory', 'DemoFactory', 'Message', 'GroupFactory'];

  function gamesIndexController($routeParams, $uibModal, PersonFactory, DemoFactory, Message, GroupFactory) {
    var vm = this;
    vm.people = {};
    vm.busy = true;

    function openErrorMessage(type) {
      var message = 'An error occured while loading your ' + type + '. Please refresh the page to try again.';
      Message.open(message);
      vm.busy = false;
    }

    if ($routeParams.demo === 'true') {
      DemoFactory.getGuestUserPeople()
        .then(function(people) {
          vm.people = people;
          getDemoGroups();
        })
        .catch(function(people) {
          openErrorMessage('people');
        });
    } else {
      PersonFactory.getPeople()
        .then(function(people) {
          vm.people = people;
          getGroups();
        })
        .catch(function(people) {
          openErrorMessage('people');
        });
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
          vm.busy = false;
        })
        .catch(function(error) {
          openErrorMessage('groups');
        });
    }

    function getDemoGroups() {
      vm.groups = [
        {name: "Dead"},
        {name: "Alive"},
        {name: "Democratic"},
        {name: "Republican"},
        {name: "Other Party"}
      ];
      vm.busy = false;
    }

    vm.open = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/games/_flashcard_modal.html',
        controller: 'gamesFlashcardsController as game',
        resolve: {
          people: function() {
            return vm.people;
          },
          groups: function() {
            return vm.groups;
          }
        }
      });
    };
  }
})();