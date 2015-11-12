angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {

  }])
  .controller('indexPeopleController', ['$scope', 'Person', 'PersonFactory', function($scope, Person, PersonFactory) {
    $scope.people = {};
    PersonFactory.getPeople().then(function(people) {
      $scope.people.people = people;
    });
  }])
  .controller('newPersonController', ['$scope', 'Person', 'PersonFactory', '$location', function($scope, Person, PersonFactory, $location) {
    $scope.submitPerson = function() {
      console.log($scope.person.first_name + " " + $scope.person.last_name);
      console.log($scope.person.image);

      PersonFactory.createWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });

    };

  }])
  .controller('showPersonController', ['$scope', '$routeParams', 'Person', '$location', function($scope, $routeParams, Person, $location) {
    Person.get({id: $routeParams.id}, function(person) {
      $scope.person = person;
    });
    $scope.deleteUser = function() {
      Person.delete({id: $routeParams.id}, function(person) {
        if (person) {
          $location.path('/people/index');
        }
      });
    };
  }])
  .controller('editPersonController', ['$scope', '$routeParams', 'Person', '$location', 'PersonFactory', function($scope, $routeParams, Person, $location, PersonFactory) {
    Person.get({id: $routeParams.id}, function(person) {
      $scope.person = person;
    });

    $scope.submitPerson = function() {
      PersonFactory.updateWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

  }]);

