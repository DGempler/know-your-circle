(function() {
  angular.module('memPeeps.people')
    .controller('personShowController', personShowController);

  personShowController.$inject = ['$routeParams', '$location', 'PersonFactory'];

  function personShowController($routeParams, $location, PersonFactory) {
    var vm = this;
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      vm.person = person;
      if (vm.person.dob === 'null' || vm.person.dob === null) {
        vm.person.dob = "";
      } else {
        vm.person.dob = moment(vm.person.dob).format("MMM Do YYYY");
      }
    });

    vm.deletePerson = function() {
      PersonFactory.deletePerson($routeParams.id).then(function(person) {
        if (person) {
          $location.path('/people/index');
        }
      });
    };
  }
})();