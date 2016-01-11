(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleDemoController', peopleDemoController);

  peopleDemoController.$inject = ['DemoFactory', '$q', 'Message'];

  function peopleDemoController(DemoFactory, $q, Message) {
    var vm = this;
    vm.demoMode = true;
    vm.sortPeopleBy = "id";

    function getGuestUserPeople() {
      vm.busy = true;
      DemoFactory.getGuestUserPeople()
        .then(function(people) {
          vm.people = people;
          vm.people.forEach(function(person) {
            person.show = true;
          });
          getGroups();
        })
        .catch(function(error) {
          var message = 'An error occured while loading your people. Please refresh the page to try again.';
          Message.open(message);
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function getGroups() {
      vm.groups = [
        {name: "Dead"},
        {name: "Alive"},
        {name: "Democratic"},
        {name: "Republican"},
        {name: "Other Party"}
      ];
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
          if (chosenGroup.name === personGroup.name) {
            person.show = true;
          }
        });
      });
    };

    getGuestUserPeople();

  }
})();