(function() {
  angular.module('knowYourCircle.people')
    .factory('PersonFactory', PersonFactory);

  PersonFactory.$inject = ['Person', 'Upload', '$q', '$uibModal'];

  function PersonFactory(Person, Upload, $q, $uibModal) {
    var personFactory = {};

    function sendPayload(formData, method, url) {
      var deferred = $q.defer();
      Upload.upload({
        url: url,
        method: method,
        fields: formData,
        arrayKey: '[]',
        file: formData.person.image,
        fileFormDataName: 'person[image]',
      })
      .then(function (resp) {
        deferred.resolve(resp.data);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    personFactory.getPeople = function() {
      var deferred = $q.defer();
      Person.query(function(people) {
        personFactory.people = people;
        deferred.resolve(personFactory.people);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    personFactory.getPerson = function(id) {
      var deferred = $q.defer();
      Person.get({id: id}, function(person) {
        deferred.resolve(person);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    personFactory.deletePerson = function(id) {
      var deferred = $q.defer();
      Person.delete({id: id}, function(person) {
        if (person) {
          deferred.resolve(person);
        }
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    personFactory.createWithAttachment = function(formData) {
      var deferred = $q.defer();
      sendPayload(formData, "POST", "/api/people")
        .then(function(data) {
          deferred.resolve(data);
        })
        .catch(function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    personFactory.updateWithAttachment = function(formData) {
      var deferred = $q.defer();
      sendPayload(formData, "PUT", "/api/people/" + formData.person.id)
        .then(function(data) {
          deferred.resolve(data);
        })
        .catch(function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    personFactory.updateWithoutAttachment = function(person) {
      var deferred = $q.defer();
      Person.update({id: person.person.id}, person, function(person) {
        deferred.resolve(person);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    personFactory.updateGroups = function(person) {
      var deferred = $q.defer();
      Person.update({id: person.id}, {person: {group_ids: person.group_ids}}, function(person) {
        deferred.resolve(person);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    personFactory.shareSelectedModalOpen = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareSelected_modal.html',
        controller: 'shareSelectedController as modal',
        windowClass: "modal fade"
      });
    };

    personFactory.shareGroupsModalOpen = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/people/_shareGroups_modal.html',
        controller: 'shareGroupsController as modal',
        windowClass: "modal fade"
      });
    };

    return personFactory;
  }
})();