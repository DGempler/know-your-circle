angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {

  }])
  .controller('newPersonController', ['$scope', 'Person', 'PersonFactory', '$location', function($scope, Person, PersonFactory, $location) {
    $scope.createPerson = function() {
      console.log($scope.person.first_name + " " + $scope.person.last_name);
      console.log($scope.person.image);

      // var person = new Person($scope.person);
      // person.$save().then(function(createdPerson) {
      //   // PersonFactory.people.push(createdPerson);
      //   $scope.person = {};
      // });

      PersonFactory.createWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });

    };

  }])
  .controller('showPersonController', ['$scope', '$routeParams', 'Person', 'PersonFactory', function($scope, $routeParams, Person, PersonFactory) {
    console.log($routeParams.id);
    Person.get({id: Number($routeParams.id)}, function(person) {
      console.log(person);
      $scope.person = person;
    });

  }]);

