angular.module('memPeeps')
  .controller('indexController', ['$scope', function($scope) {

  }])
  .controller('homeController', ['$scope', function($scope) {
  }])
  .controller('peopleIndexController', ['$scope', 'PersonFactory', function($scope, PersonFactory) {
    $scope.people = {};
    PersonFactory.getPeople().then(function(people) {
      $scope.people.people = people;
    });
  }])
  .controller('personNewController', ['$scope', 'PersonFactory', '$location', function($scope, PersonFactory, $location) {
    $scope.submitPerson = function() {
      PersonFactory.createWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };
  }])
  .controller('personShowController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
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
  .controller('personEditController', ['$scope', '$routeParams', '$location', 'PersonFactory', function($scope, $routeParams, $location, PersonFactory) {
    PersonFactory.getPerson($routeParams.id).then(function(person) {
      $scope.person = person;
    });

    $scope.submitPerson = function() {
      PersonFactory.updateWithAttachment($scope.person).then(function(data) {
        $location.path('/people/show/' + data.id);
      });
    };

  }])
  .controller('gamesIndexController', ['$scope', '$uibModal', 'PersonFactory', function($scope, $uibModal, PersonFactory) {
    $scope.people = {};

    PersonFactory.getPeople().then(function(people) {
      $scope.people.people = people;
    });

    $scope.open = function () {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/games/_flashcard_modal.html',
        controller: 'gamesFlashcardsController',
        size: 'lg',
        resolve: {
          people: function () {
            return $scope.people.people;
          }
        }
      });
    };

  }])
  .controller('gamesFlashcardsController', ['$scope', '$uibModalInstance', 'people', function ($scope, $uibModalInstance, people) {
    $scope.people = {};

    $scope.people.people = people;

    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

  }]);

