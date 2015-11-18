angular.module('memPeeps.people')
  .controller('personShowController', personShowController);

personShowController.$inject = ['$scope', '$routeParams', '$location', 'PersonFactory'];

function personShowController($scope, $routeParams, $location, PersonFactory) {
  PersonFactory.getPerson($routeParams.id).then(function(person) {
    $scope.person = person;
    if ($scope.person.dob === 'null' || $scope.person.dob === null) {
      $scope.person.dob = "";
    } else {
      $scope.person.dob = moment($scope.person.dob).format("MMM Do YYYY");
    }
  });

  $scope.deletePerson = function() {
    PersonFactory.deletePerson($routeParams.id).then(function(person) {
      if (person) {
        $location.path('/people/index');
      }
    });
  };
}