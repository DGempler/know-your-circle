(function() {
  angular.module('knowYourCircle.people')
    .controller('personEditController', personEditController);

  personEditController.$inject = ['$routeParams', '$location', 'PersonFactory', 'GroupFactory', 'AuthFactory'];

  function personEditController($routeParams, $location, PersonFactory, GroupFactory, AuthFactory) {
    var vm = this;
    var originalPerson;
    var originalGroups;

    function cleanGroupIds(groupIds, allGroups) {
      var newGroupIds = [];
      allGroups.forEach(function(group) {
        if (groupIds.indexOf(group.id) !== -1) {
          newGroupIds.push(group.id);
        }
      });
      return newGroupIds;
    }

    function getGroups() {
      GroupFactory.getGroups()
        .then(function(groups) {
          originalGroups = groups;
          vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
          vm.groups = [];
          groups.forEach(function(group) {
            vm.groups.push(group);
          });
        })
        .catch(function(error) {
          var message = 'An error occured while loading your groups. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });
    }

    vm.createGroup = function() {
      GroupFactory.openGroupModal(originalGroups)
        .then(function(groups) {
          originalGroups = groups;
          vm.person.group_ids = cleanGroupIds(vm.person.group_ids, groups);
          vm.groups = [];
          groups.forEach(function(group) {
            vm.groups.push(group);
          });
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

    // prevent "null" from being sent as a value to server if form field is left blank
    function removeNullValues(submittedPerson, newPerson) {
      for (var key in submittedPerson) {
        // if original person had value OR sumbitted person now has a value
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
              var message = 'An error occured while updating your person. Please refresh the page and try again.';
              AuthFactory.messageModalOpen(message);
            })
            .finally(function() {
              vm.busy = false;
            });
        } else {
          cleanedPerson = {person: cleanPersonProps(vm.person)};
          PersonFactory.updateWithoutAttachment(cleanedPerson)
            .then(function(data) {
              $location.path('/people/show/' + data.id);
            })
            .catch(function(error) {
              var message = 'An error occured while updating your person. Please refresh the page and try again.';
              AuthFactory.messageModalOpen(message);
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

    PersonFactory.getPerson($routeParams.id).then(function(person) {
      originalPerson = person;
      vm.person = {};
      for (var prop in person) {
        if (prop === 'hints') {
          vm.person.hints = [];
          if (vm.person.hints.length === 0) {
            vm.person.hints.push("");
          } else {
            person.hints.forEach(function(hint) {
              if (hint) {
                vm.person.hints.push(hint);
              }
            });
          }
        } else if (prop === 'dob') {
          if (person.dob) {
            vm.person.dob = new Date(person.dob);
          }
        } else if (prop === 'groups') {
          vm.person.group_ids = [];
          person.groups.forEach(function(group) {
            vm.person.group_ids.push(group.id);
          });
        } else {
          vm.person[prop] = person[prop];
        }
      }

      getGroups();
    });

  }
})();