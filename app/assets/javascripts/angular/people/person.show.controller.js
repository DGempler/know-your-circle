(function() {
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
      var tempArray = [];
      $scope.person.hints.forEach(function(hint) {
        if (hint) {
          tempArray.push(hint);
        }
      });
      $scope.person.hints = tempArray;
    });

    $scope.deletePerson = function() {
      PersonFactory.deletePerson($routeParams.id).then(function(person) {
        if (person) {
          $location.path('/people/index');
        }
      });
    };
  }
})();