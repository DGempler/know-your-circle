(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleIndexController', peopleIndexController);

  peopleIndexController.$inject = ['PersonFactory', 'GroupFactory', '$q', 'Message', 'Share'];

  function peopleIndexController(PersonFactory, GroupFactory, $q, Message, Share) {
    var vm = this;
    vm.sortPeopleBy = "first_name";

    function getPeople() {
      vm.busy = true;
      PersonFactory.getPeople().then(function(people) {
        vm.people = people;
        vm.people.forEach(function(person) {
          person.show = true;
        });
        getGroups();
      })
      .catch(function(error) {
        var message = 'An error occured while loading your people. Please refresh the page to try again.';
        Message.open(message);
        vm.busy = false;
      });
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
        })
        .catch(function(error) {
          var message = 'An error occured while loading your groups. Please refresh the page to try again.';
          Message.open(message);
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function deleteSelected(idArray, promiseArray) {
      vm.people = cleanPeople(idArray);
      vm.someoneSelected = false;
      $q.all(promiseArray)
        .catch(function(errors) {
          var message = 'An error occured while deleting your people. Please refresh the page and try again.';
          Message.open(message);
        });
    }

    function cleanPeople(deletePeopleIds) {
      var newPeople = [];
      angular.forEach(vm.people, function(person) {
        if (deletePeopleIds.indexOf(person.id) === -1) {
          newPeople.push(person);
        }
      });
      return newPeople;
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

    vm.clickDelete = function() {
      var idArray = [];
      var promiseArray = [];
      var message;
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          idArray.push(person.id);
          promiseArray.push(PersonFactory.deletePerson(person.id));
        }
      });
      message = "Are you sure you want to delete " + promiseArray.length + " of your people?";
      Message.openConfirm(message)
        .then(function() {
          deleteSelected(idArray, promiseArray);
        });
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
        vm.busy = true;
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
            vm.someoneSelected = false;
            getPeople();
            Message.open(message);
          })
          .catch(function(error) {
            message = 'An error occured while applying your group. Please refresh the page and try again.';
            Message.open(message);
          })
          .finally(function() {
            vm.busy = false;
          });
      } else {
        message = "This group already exists on selected person(s).";
        Message.open(message);
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

    vm.shareSelected = function() {
      var selectedPeople = [];
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          selectedPeople.push(person);
        }
      });
      if (selectedPeople.length > 25) {
        size = null;
      } else {
        size = 'sm';
      }
      Share.shareSelectedModalOpen(selectedPeople, size);
    };

    vm.shareGroups = function() {
      if (vm.groups.length > 25) {
        size = null;
      } else {
        size = 'sm';
      }
      Share.shareGroupsModalOpen(vm.groups, size);
    };

    getPeople();

  }
})();