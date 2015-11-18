angular.module('memPeeps')
  .controller('peopleIndexController', ['$scope', 'PersonFactory', '$q', function($scope, PersonFactory, $q) {
    $scope.people = {};

    function getPeople() {
      PersonFactory.getPeople().then(function(people) {
        $scope.people.people = people;
      });
    }

    function deleteSelected() {
      var promiseArray = [];
      angular.forEach($scope.people.people, function(person) {
        if (person.selected) {
          promiseArray.push(PersonFactory.deletePerson(person.id));
        }
      });
      $q.all(promiseArray).then(function(people) {
        $scope.people.someoneSelected = false;
        getPeople();
      });
    }
    $scope.selectAll = function(bool) {
      if (bool) {
        $scope.people.someoneSelected = true;
        angular.forEach($scope.people.people, function(person) {
          person.selected = true;
        });
      } else {
        $scope.people.someoneSelected = false;
        angular.forEach($scope.people.people, function(person) {
          person.selected = false;
        });
      }
    };

    $scope.personSelected = function() {
      var selected = false;
      angular.forEach($scope.people.people, function(person) {
        if (person.selected) {
          selected = true;
        }
      });
      $scope.people.someoneSelected = selected;
    };

    $scope.clickDelete = function() {
      var confirmDelete = window.confirm("Are you sure?");
      if (confirmDelete) {
        deleteSelected();
      }
    };

    getPeople();

  }]);