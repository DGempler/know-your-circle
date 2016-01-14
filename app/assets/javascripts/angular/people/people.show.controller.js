(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleShowController', peopleShowController);

  peopleShowController.$inject = ['$routeParams', '$location', 'PersonFactory', 'Message'];

  function peopleShowController($routeParams, $location, PersonFactory, Message) {
    var vm = this;

    function filterPerson() {
      if (vm.person.dob === 'null' || vm.person.dob === null) {
        vm.person.dob = "";
      } else {
        vm.person.dob = moment(vm.person.dob).format("MMM Do YYYY");
      }
    }

    function getPersonSuccess(person) {
      vm.person = person;
      filterPerson();
    }

    function errorMessage(type, joiner) {
      var message = 'An error occured while ' + type + '. Please refresh the page ' + joiner + ' try again.';
      Message.open(message);
    }

    function getPerson(argument) {
      vm.busy = true;
      PersonFactory.getPerson($routeParams.id)
        .then(function(person) {
          getPersonSuccess();
        })
        .catch(function(error) {
          errorMessage('loading your person', 'to');
        })
        .finally(function() {
          vm.busy = false;
        });
    }



  vm.deletePerson = function() {
    var message = "Are you sure?";
    Message.openConfirm(message)
      .then(function() {
        vm.busy = true;
        PersonFactory.deletePerson($routeParams.id)
          .then(function(person) {
            if (person) {
              $location.path('/people/index');
            }
          })
          .catch(function(error) {
            errorMessage('deleting your person', 'and');
          })
          .finally(function() {
            vm.busy = false;
          });
      });
    };
  }
})();