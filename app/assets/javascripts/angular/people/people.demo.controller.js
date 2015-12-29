(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleDemoController', peopleDemoController);

  peopleDemoController.$inject = ['PersonFactory', 'GroupFactory', '$q', 'AuthFactory', 'UserFactory'];

  function peopleDemoController(PersonFactory, GroupFactory, $q, AuthFactory, UserFactory) {
    var vm = this;
    vm.demoMode = true;

    function getPeople() {
      PersonFactory.getPeople().then(function(people) {
        vm.people = people;
        vm.people.forEach(function(person) {
          person.show = true;
        });
        getGroups();
      });
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
        })
        .catch(function(error) {
          var message = 'An error occured while loading your groups. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    }

    vm.selectAllCheckbox = function(bool) {
      if (bool && vm.people.length > 0) {
        vm.selectAll();
      } else {
        vm.someoneSelected = false;
        vm.selectNone();
      }
    };

    vm.selectAll = function() {
      if (vm.people.length > 0) {
        vm.someoneSelected = true;
        angular.forEach(vm.people, function(person) {
          person.selected = true;
        });
      }
    };

    vm.selectNone = function() {
        vm.someoneSelected = false;
        angular.forEach(vm.people, function(person) {
          person.selected = false;
        });
    };

    vm.selectAllShown = function() {
      if (vm.people.length > 0) {
        vm.someoneSelected = true;
        angular.forEach(vm.people, function(person) {
          if (person.show) {
            person.selected = true;
          }
        });
      }
    };

    vm.selectNoneShown = function() {
      var someStillSelected = false;
      angular.forEach(vm.people, function(person) {
        if (person.show) {
          person.selected = false;
        } else if (person.selected) {
          someStillSelected = true;
        }
      });
      if (!someStillSelected) {
        vm.someoneSelected = false;
      }
    };

    vm.personSelected = function() {
      var selected = false;
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          selected = true;
        }
      });
      vm.someoneSelected = selected;
    };

    vm.showAll = function() {
      vm.filteredByGroup = false;
      angular.forEach(vm.people, function(person) {
        person.show = true;
      });
    };

    vm.filterGroup = function(chosenGroup) {
      vm.filteredByGroup = true;
      vm.filteredGroup = chosenGroup.name;
      angular.forEach(vm.people, function(person) {
        person.show = false;
        person.groups.forEach(function(personGroup) {
          if (chosenGroup.id === personGroup.id) {
            person.show = true;
          }
        });
      });
    };

    getPeople();

  }
})();