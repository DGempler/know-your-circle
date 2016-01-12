(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleIndexController', peopleIndexController);

  peopleIndexController.$inject = ['PersonFactory', 'GroupFactory', '$q', 'Message', 'Share'];

  function peopleIndexController(PersonFactory, GroupFactory, $q, Message, Share) {
    var vm = this;
    vm.sortPeopleBy = "first_name";

    function addShowToAllPeople() {
      angular.forEach(vm.people, function(person) {
        person.show = true;
      });
    }

    function toggleSelectedOnAllPeople(isSelected) {
      angular.forEach(vm.people, function(person) {
        person.selected = isSelected;
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
      vm.busy = false;
    }

    function getPeople() {
      vm.busy = true;
      PersonFactory.getPeople().then(function(people) {
        handleGetPeopleSuccess();
      })
      .catch(function(error) {
        handleGetPeopleError();
      });
    }

    function handleGetGroupsError() {
      var message = 'An error occured while loading your groups. Please refresh the page to try again.';
      Message.open(message);
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          vm.groups = groups;
        })
        .catch(function(error) {
          handleGetGroupsError();
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function handleDeletePeopleError() {
      var message = 'An error occured while deleting your people. Please refresh the page and try again.';
      Message.open(message);
    }

    function sendDeletedToBackend(promiseArray) {
      $q.all(promiseArray)
        .catch(function(errors) {
          handleDeletePeopleError();
        });
    }

    function deleteSelected(deletionArrays) {
      vm.people = cleanPeople(deletionArrays.idArray);
      vm.someoneSelected = false;
      sendDeletedToBackend(deletionArrays.promiseArray);
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

    function addSelectedToDeletionArrays(deletionArrays) {
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          deletionArrays.idArray.push(person.id);
          deletionArrays.promiseArray.push(PersonFactory.deletePerson(person.id));
        }
      });
    }

    function openConfirmMessage(deletionArrays) {
      var message = "Are you sure you want to delete " + deletionArrays.promiseArray.length + " of your people?";
      Message.openConfirm(message)
        .then(function() {
          deleteSelected(deletionArrays);
        });
    }

    function checkPeopleGroups(chosenGroup) {
      angular.forEach(vm.people, function(person) {
        person.show = false;
        person.groups.forEach(function(personGroup) {
          if (chosenGroup.id === personGroup.id) {
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
        toggleSelectedOnAllPeople(true);
      }
    };

    vm.selectNone = function() {
      vm.someoneSelected = false;
      toggleSelectedOnAllPeople(false);
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
      var deletionArrays = {
        idArray: [],
        promiseArray: []
      };
      addSelectedToDeletionArrays(deletionArrays);
      openConfirmMessage(deletionArrays);
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

    function createGroupIdsArrayAndPrepForReq(person, promises, exists) {
      person.group_ids = [];
      person.groups.forEach(function(existingGroup) {
        person.group_ids.push(existingGroup.id);
      });
      if (person.group_ids.indexOf(newGroup.id) === -1) {
        addGroupToIdArrayAndPromise(person, newGroup.id, promises);
      } else {
        exists.push(person);
      }
    }

    function addGroupToIdArrayAndPromise(person, id, promises) {
      person.group_ids.push(id);
      promises.push(PersonFactory.updateGroups(person));
    }

    function checkSelectedForApplyGroup(promises, exists) {
      angular.forEach(vm.people, function(person) {
        if (person.selected) {
          prepPersonForPutRequest(person, promises, exists);
        }
      });
    }

    function addGroupAppliedPeopleToMessage(people) {
      var message = group.name + " has been added to: ";
      people.forEach(function(person, index) {
        if (index !== people.length - 1) {
          message += person.first_name + " " + person.last_name + ", ";
        } else {
          message += person.first_name + " " + person.last_name + ".";
        }
      });
      return message;
    }

    function addGroupExistedPeopleToMessage(people, message) {
      var message = " It already existed on: ";
      exists.forEach(function(person, index) {
        if (index !== exists.length - 1) {
          message += person.first_name + " " + person.last_name + ", ";
        } else {
          message += person.first_name + " " + person.last_name + ".";
        }
      });
      return message;
    }

    function handleApplyGroupSuccess(people, group, exists) {
      vm.someoneSelected = false;
      var message = addGroupAppliedPeopleToMessage(people);
      if (exists.length > 0) {
        message += addGroupExistedPeopleToMessage();
      }
      Message.open(message);
      getPeople();
    }

    function handleApplyGroupError() {
      var message = 'An error occured while applying your group. Please refresh the page and try again.';
      Message.open(message);
    }

    function applyNewGroup(group, promises, exists) {
      vm.busy = true;
      $q.all(promiseArray)
        .then(function(people) {
          handleApplyGroupSuccess(people, group, exists);
        })
        .catch(function(error) {
          handleApplyGroupError();
        })
        .finally(function() {
          vm.busy = false;
        });
    }

    function groupAlreadyExistsMessage() {
      var message = "This group already exists on selected person(s).";
      Message.open(message);
    }

    vm.applyGroup = function(newGroup) {
      var promiseArray = [];
      var alreadyExistsArray = [];
      checkSelectedForApplyGroup(promiseArray, alreadyExistsArray);
      if (promiseArray.length > 0) {
        applyNewGroup(newGroup, promiseArray, alreadyExistsArray);
      } else {
        groupAlreadyExistsMessage();
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
      checkPeopleGroups(chosenGroup);
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