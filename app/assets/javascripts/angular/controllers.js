angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {
  }])
  .controller('indexPeopleController', ['$scope', 'PersonFactory', function($scope, PersonFactory) {
    $scope.people = {};
    PersonFactory.getPeople().then(function(people) {
      $scope.people.people = people;
    });
  }])
  .controller('newPersonController', ['$scope', 'PersonFactory', '$location', function($scope, PersonFactory, $location) {
    $scope.submitPerson = function() {
      PersonFactory.createWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };
  }])
  .controller('showPersonController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      $scope.person = person;
    });

    $scope.deletePerson = function() {
      PersonFactory.deletePerson($routeParams.id).then(function(person) {
        if (person) {
          $location.path('/people/index');
        }
      });
    };
  }])
  .controller('editPersonController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      $scope.person = person;
    });

    $scope.submitPerson = function() {
      PersonFactory.updateWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

  }]);

