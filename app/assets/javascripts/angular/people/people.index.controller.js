(function() {
  angular.module('memPeeps.people')
    .controller('peopleIndexController', peopleIndexController);

  peopleIndexController.$inject = ['PersonFactory', 'GroupFactory', '$q'];

  function peopleIndexController(PersonFactory, GroupFactory, $q) {
    var vm = this;

    function getPeople() {
      PersonFactory.getPeople().then(function(people) {
        vm.people = people;
        getGroups();
      });
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
        })
        .catch(function(error) {
          console.log(error);
        });
    }


    function deleteSelected() {
      var promiseArray = [];
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          promiseArray.push(PersonFactory.deletePerson(person.id));
        }
      });
      $q.all(promiseArray).then(function(people) {
        vm.someoneSelected = false;
        getPeople();
      });
    }
    vm.selectAll = function(bool) {
      if (bool) {
        vm.someoneSelected = true;
        angular.forEach(vm.people, function(person) {
          person.selected = true;
        });
      } else {
        vm.someoneSelected = false;
        angular.forEach(vm.people, function(person) {
          person.selected = false;
        });
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

    vm.clickDelete = function() {
      var confirmDelete = window.confirm("Are you sure?");
      if (confirmDelete) {
        deleteSelected();
      }
    };

    vm.editGroups = function() {
      GroupFactory.openGroupModal(vm.groups);
    };

    getPeople();

  }
})();