(function() {
  angular.module('knowYourCircle.demo')
    .controller('demoIndexController', demoIndexController);

  demoIndexController.$inject = ['DemoFactory', '$q', 'Message'];

  function demoIndexController(DemoFactory, $q, Message) {
    var vm = this;
    vm.demoMode = true;
    vm.sortPeopleBy = "id";

    function addShowToAllPeople() {
      angular.forEach(vm.people, function(person) {
        person.show = true;
      });
    }

    function handleGetPeopleSuccess(people) {
      vm.people = people;
      addShowToAllPeople();
      getGroups();
    }

    function handleGetPeopleError() {
      var message = 'An error occured while loading your people. Please refresh the page to try again.';
      Message.open(message);
    }

    function getGuestUserPeople() {
      vm.busy = true;
      DemoFactory.getGuestUserPeople()
        .then(function(people) {
          handleGetPeopleSuccess(people);
        })
        .catch(function(error) {
          handleGetPeopleError();
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

    function checkPeopleGroups(chosenGroup) {
      angular.forEach(vm.people, function(person) {
        person.show = false;
        person.groups.forEach(function(personGroup) {
          if (chosenGroup.name === personGroup.name) {
            person.show = true;
          }
        });
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
      addShowToAllPeople();
    };

    vm.filterGroup = function(chosenGroup) {
      vm.filteredByGroup = true;
      vm.filteredGroup = chosenGroup.name;
      checkPeopleGroups(chosenGroup);
    };

    getGuestUserPeople();

  }
})();