(function() {
  angular.module('knowYourCircle.people')
    .controller('personShowController', personShowController);

  personShowController.$inject = ['$scope', '$routeParams', '$location', 'PersonFactory', 'UserFactory', 'AuthFactory'];

  function personShowController($scope, $routeParams, $location, PersonFactory, UserFactory, AuthFactory) {
      PersonFactory.getPerson($routeParams.id)
        .then(function(person) {
          $scope.person = person;
          if ($scope.person.dob === 'null' || $scope.person.dob === null) {
            $scope.person.dob = "";
          } else {
            $scope.person.dob = moment($scope.person.dob).format("MMM Do YYYY");
          }
        })
        .catch(function(error) {
          var message = 'An error occured while loading your person. Please refresh the page to try again.';
          AuthFactory.messageModalOpen(message);
        });

    $scope.deletePerson = function() {
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