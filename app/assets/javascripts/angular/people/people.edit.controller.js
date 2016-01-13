(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleEditController', peopleEditController);

  peopleEditController.$inject = ['$routeParams', '$location', 'PersonFactory', 'GroupFactory', 'Message'];

  function peopleEditController($routeParams, $location, PersonFactory, GroupFactory, Message) {
    var vm = this;
    var originalPerson;
    var originalGroups;

    function createFilteredPerson(person) {
      originalPerson = person;
      vm.person = {};
      approvedKeysFilter(person);
      hintsFilter(person);
      groupsFilter(person);
      dobFilter(person);
    }

    function approvedKeysFilter(person) {
      var approvedKeys = [
        'first_name', 'last_name', 'sex', 'nickname', 'middle_name', 'location',
        'occupation', 'bio', 'id', 'image_updated_at', 'image_file_name'];
      for (var i = 0; i < approvedKeys.length; i++) {
        vm.person[approvedKeys[i]] = person[approvedKeys[i]];
      }
    }

    function hintsFilter(person) {
      vm.person.hints = [];
      if (person.hints.length === 0) {
        vm.person.hints.push("");
      } else {
        person.hints.forEach(function(hint) {
          if (hint) {
            vm.person.hints.push(hint);
          }
        });
      }
    }

    function groupsFilter(person) {
      vm.person.group_ids = [];
      person.groups.forEach(function(group) {
        vm.person.group_ids.push(group.id);
      });
    }

    function dobFilter(person) {
      if (person.dob) {
        vm.person.dob = new Date(person.dob);
      }
    }

    function errorMessage(type, joiner) {
      var message = 'An error occured while ' + type + '. Please refresh the page ' + joiner + ' try again.';
      Message.open(message);
    }

    function getPerson () {
      PersonFactory.getPerson($routeParams.id)
        .then(function(person) {
          createFilteredPerson(person);
          getGroups();
        })
      .catch(function(error) {
        errorMessage('loading your person', 'to');
      });
    }

    function cleanGroupIds(groupIds, allGroups) {
      var newGroupIds = [];
      allGroups.forEach(function(group) {
        if (groupIds.indexOf(group.id) !== -1) {
          newGroupIds.push(group.id);
        }
      });
      return newGroupIds;
    }

    function copyGroups(groups) {
      originalGroups = groups;
      vm.groups = [];
      groups.forEach(function(group) {
        vm.groups.push(group);
      });
    }

    function getGroupSuccess(groups) {
      copyGroups(groups);
      vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          getGroupSuccess(groups);
        })
        .catch(function(error) {
          errorMessage('loading your groups', 'to');
        });
    }

    vm.createGroup = function() {
      GroupFactory.openGroupModal(originalGroups)
        .then(function(groups) {
          getGroupSuccess(groups);
        })
        .catch(function() {
          getGroups();
        });
    };

    vm.applyGroup = function(group) {
      if (vm.person.group_ids.indexOf(group.id) === -1) {
        vm.person.group_ids.push(group.id);
      }
    };

    vm.removeGroup = function(removeId) {
      //splice inside of iteration OK here because it only happens once
      for (var i = 0; i < vm.person.group_ids.length; i++) {
        if (removeId === vm.person.group_ids[i]) {
          vm.person.group_ids.splice(i, 1);
          break;
        }
      }
    };

    function removeNullValues(submittedPerson, newPerson) {
      for (var key in submittedPerson) {
        if (originalPerson[key] || submittedPerson[key]) {
          newPerson[key] = submittedPerson[key];
        }
      }
    }

    function removeEmptyHints(submittedPerson, newPerson) {
      var tempArray = [];
      submittedPerson.hints.forEach(function(hint) {
        if (hint) {
          tempArray.push(hint);
        }
      });
      newPerson.hints = tempArray;
    }

    function cleanPersonProps(submittedPerson) {
      var newPerson = {};
      removeNullValues(submittedPerson, newPerson);
      removeEmptyHints(submittedPerson, newPerson);
      return newPerson;
    }

    vm.submitPerson = function(isValid) {
      if (isValid) {
        vm.busy = true;
        var cleanedPerson = {person: cleanPersonProps(vm.person)};
        if (vm.person.image) {
          PersonFactory.updateWithAttachment(cleanedPerson)
            .then(function(data) {
              $location.path('/people/show/' + data.id);
            })
            .catch(function(err) {
              errorMessage('updating your person', 'and');
            })
            .finally(function() {
              vm.busy = false;
            });
        } else {
          PersonFactory.updateWithoutAttachment(cleanedPerson)
            .then(function(data) {
              $location.path('/people/show/' + data.id);
            })
            .catch(function(error) {
              errorMessage('updating your person', 'and');
            })
            .finally(function() {
              vm.busy = false;
            });
        }
      }
    };

    vm.addInputFields = function() {
      vm.addedInputFields = true;
    };

    vm.addHintInputs = function() {
      if (vm.person.hints.length <= 2) {
        vm.person.hints.push('');
      }
    };

    getPerson();

  }
})();