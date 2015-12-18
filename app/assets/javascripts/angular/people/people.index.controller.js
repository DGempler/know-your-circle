(function() {
  angular.module('memPeeps.people')
    .controller('peopleIndexController', peopleIndexController);

  peopleIndexController.$inject = ['PersonFactory', 'GroupFactory', '$q', 'AuthFactory'];

  function peopleIndexController(PersonFactory, GroupFactory, $q, AuthFactory) {
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
          var message = 'There was an error while loading your groups. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
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
      GroupFactory.openGroupModal(vm.groups)
        .then(function(groups) {
          vm.groups = groups;
        })
        .catch(function() {
          getGroups();
        });
    };

    vm.applyGroup = function(newGroup) {
      var promiseArray = [];
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          person.group_ids = [];
          person.groups.forEach(function(existingGroup) {
            person.group_ids.push(existingGroup.id);
          });
          person.group_ids.push(newGroup.id);
          promiseArray.push(PersonFactory.updateGroups(person));
        }
      });
      $q.all(promiseArray)
        .then(function(people) {
          var message = newGroup.name + " has been added to: ";
          people.forEach(function(person, index) {
            if (index !== people.length - 1) {
              message += person.first_name + " " + person.last_name + ", ";
            } else {
              message += person.first_name + " " + person.last_name;
            }
          });
          AuthFactory.messageModalOpen(message);
          vm.someoneSelected = false;
          getPeople();
        })
        .catch(function(error) {
          var message = 'There was an error applying your group. Please try again.';
          AuthFactory.messageModalOpen(message);
        });
    };

    getPeople();

  }
})();