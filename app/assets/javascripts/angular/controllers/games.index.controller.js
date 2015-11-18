angular.module('memPeeps')
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
        resolve: {
          people: function () {
            return $scope.people.people;
          }
        }
      });
    };
  }]);