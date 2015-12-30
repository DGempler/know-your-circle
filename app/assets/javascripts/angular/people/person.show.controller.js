(function() {
  angular.module('knowYourCircle.people')
    .controller('personShowController', personShowController);

  personShowController.$inject = ['$routeParams', '$location', 'PersonFactory', 'UserFactory', 'AuthFactory'];

  function personShowController($routeParams, $location, PersonFactory, UserFactory, AuthFactory) {
    var vm = this;
    PersonFactory.getPerson($routeParams.id)
      .then(function(person) {
        vm.person = person;
        if (vm.person.dob === 'null' || vm.person.dob === null) {
          vm.person.dob = "";
        } else {
          vm.person.dob = moment(vm.person.dob).format("MMM Do YYYY");
        }
      })
      .catch(function(error) {
        var message = 'An error occured while loading your person. Please refresh the page to try again.';
        AuthFactory.messageModalOpen(message);
      });

  vm.deletePerson = function() {
    var message = "Are you sure?";
    UserFactory.confirmMessageModalOpen(message)
      .then(function() {
        PersonFactory.deletePerson($routeParams.id)
          .then(function(person) {
            if (person) {
              $location.path('/people/index');
            }
          })
          .catch(function(error) {
            var message = 'An error occured while deleting your person. Please refresh the page and try again.';
            AuthFactory.messageModalOpen(message);
          });
      });
    };
  }
})();