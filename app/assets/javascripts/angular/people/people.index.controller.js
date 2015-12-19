(function() {
  angular.module('memPeeps.people')
    .controller('peopleIndexController', peopleIndexController);

  peopleIndexController.$inject = ['PersonFactory', 'GroupFactory', '$q', 'AuthFactory'];

  function peopleIndexController(PersonFactory, GroupFactory, $q, AuthFactory) {
    var vm = this;

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


    vm.selectAllCheckbox = function(bool) {
      if (bool) {
        vm.selectAll();
      } else {
        vm.selectNone();
      }
    };

    vm.selectAll = function() {
      vm.someoneSelected = true;
      angular.forEach(vm.people, function(person) {
        person.selected = true;
      });
    };

    vm.selectNone = function() {
      vm.someoneSelected = false;
      angular.forEach(vm.people, function(person) {
        person.selected = false;
      });
    };

    vm.selectAllShown = function() {
      angular.forEach(vm.people, function(person) {
        if (person.show) {
          person.selected = true;
        }
      });
    };

    vm.selectNoneShown = function() {
      angular.forEach(vm.people, function(person) {
          if (person.show) {
            person.selected = false;
          }
        });
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
      var alreadyExistsArray = [];
      var message;
      vm.someoneSelected = false;
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          person.group_ids = [];
          person.groups.forEach(function(existingGroup) {
            person.group_ids.push(existingGroup.id);
          });
          if (person.group_ids.indexOf(newGroup.id) === -1) {
            person.group_ids.push(newGroup.id);
            promiseArray.push(PersonFactory.updateGroups(person));
          } else {
            alreadyExistsArray.push(person);
          }
        }
      });
      if (promiseArray.length > 0) {
        $q.all(promiseArray)
          .then(function(people) {
            message = newGroup.name + " has been added to: ";
            people.forEach(function(person, index) {
              if (index !== people.length - 1) {
                message += person.first_name + " " + person.last_name + ", ";
              } else {
                message += person.first_name + " " + person.last_name + ".";
              }
            });
            if (alreadyExistsArray.length > 0) {
              message += " It already existed on: ";
              alreadyExistsArray.forEach(function(person, index) {
                if (index !== alreadyExistsArray.length - 1) {
                  message += person.first_name + " " + person.last_name + ", ";
                } else {
                  message += person.first_name + " " + person.last_name + ".";
                }
              });
            }
            getPeople();
            AuthFactory.messageModalOpen(message);
          })
          .catch(function(error) {
            message = 'There was an error applying your group. Please try again.';
            AuthFactory.messageModalOpen(message);
          });
      } else {
        message = "This group already exists on selected person(s).";
        AuthFactory.messageModalOpen(message);
      }
    };

    vm.showAll = function() {
      vm.filteredByGroup = false;
      angular.forEach(vm.people, function(person) {
        person.show = true;
      });
    };

    vm.filterGroup = function(chosenGroup) {
      vm.filteredByGroup = true;
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