angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {

  }])
  .controller('newPersonController', ['$scope', function($scope) {
    $scope.submitPerson = function() {
      console.log($scope.person.first_name + " " + $scope.person.last_name);
      console.log($scope.person.image);
    };
  }]);

