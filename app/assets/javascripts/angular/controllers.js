angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {

  }])
  .controller('newPersonController', ['$scope', 'Person', 'PersonFactory', function($scope, Person, PersonFactory) {
    $scope.createPerson = function() {
      console.log($scope.person.first_name + " " + $scope.person.last_name);
      console.log($scope.person.image);

      var person = new Person($scope.person);
      person.$save().then(function(createdPerson) {
        // PersonFactory.people.push(createdPerson);
        $scope.person = {};
      });

    };

  }]);

