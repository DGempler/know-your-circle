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
      vm.busy = true;
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
        })
        .finally(function() {
          vm.busy = false;
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
        // if original person had value, and submitted person doesn't OR sumbitted person now has a value
        if ((originalPerson[key] && !submittedPerson[key]) || submittedPerson[key] || key === 'image') {
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
        var cleanedPerson;
        if (vm.person.image) {
          cleanedPerson = {person: cleanPersonProps(vm.person)};
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
          if (vm.person.deleteImage) {
            vm.person.image = null;
          }
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
      vm.person.first_name = person.first_name;
      vm.person.last_name = person.last_name;
      vm.person.sex = person.sex;
      vm.person.nickname = person.nickname;
      vm.person.middle_name = person.middle_name;
      vm.person.location = person.location;
      vm.person.occupation = person.occupation;
      if (person.dob) {
        vm.person.dob = new Date(person.dob);
      }
      vm.person.bio = person.bio;
      vm.person.id = person.id;
      vm.person.group_ids = [];
      vm.person.image_updated_at = person.image_updated_at;
      vm.person.image_file_name = person.image_file_name;
      person.groups.forEach(function(group) {
        vm.person.group_ids.push(group.id);
      });
      vm.person.hints = [];
      person.hints.forEach(function(hint) {
        if (hint) {
          vm.person.hints.push(hint);
        }
      });
      if (vm.person.hints.length === 0) {
        vm.person.hints.push("");
      }
      getGroups();
    });

  }
})();