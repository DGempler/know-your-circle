(function() {
  angular.module('knowYourCircle.demo')
    .controller('demoShowController', demoShowController);

  demoShowController.$inject = ['$routeParams', 'DemoFactory', 'Message'];

  function demoShowController($routeParams, DemoFactory, Message) {
    var vm = this;
    vm.demoMode = true;
    vm.busy = true;

    function getPersonSuccess(person) {
      vm.person = person;
        if (vm.person.dob === 'null' || vm.person.dob === null) {
          vm.person.dob = "";
        } else {
          vm.person.dob = moment(vm.person.dob).format("MMM Do YYYY");
        }
    }

    function getPersonError() {
      var message = 'An error occured while loading your person. Please refresh the page to try again.';
      Message.open(message);
    }

    DemoFactory.getGuestUserPerson($routeParams.id)
      .then(function(person) {
        getPersonSuccess(person);
      })
      .catch(function(error) {
        getPersonError();
      })
      .finally(function() {
        vm.busy = false;
      });
  }
})();