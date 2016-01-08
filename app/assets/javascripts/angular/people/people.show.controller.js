(function() {
  angular.module('knowYourCircle.people')
    .controller('peopleShowController', peopleShowController);

  peopleShowController.$inject = ['$routeParams', '$location', 'PersonFactory', 'UserFactory', 'AuthFactory'];

  function peopleShowController($routeParams, $location, PersonFactory, UserFactory, AuthFactory) {
    var vm = this;
    vm.busy = true;
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
      })
      .finally(function() {
        vm.busy = false;
      });

  vm.deletePerson = function() {
    var message = "Are you sure?";
    UserFactory.confirmMessageModalOpen(message)
      .then(function() {
        vm.busy = true;
        PersonFactory.deletePerson($routeParams.id)
          .then(function(person) {
            if (person) {
              $location.path('/people/index');
            }
          })
          .catch(function(error) {
            var message = 'An error occured while deleting your person. Please refresh the page and try again.';
            AuthFactory.messageModalOpen(message);
          })
          .finally(function() {
            vm.busy = false;
          });
      });
    };
  }
})();