angular.module('memPeeps')
.factory('Person', ['$resource', function($resource) {
  return $resource('//localhost:3000/api/people/:id');
}])
.factory('PersonFactory', ['Person', 'Upload', '$q', function(Person, Upload, $q) {
  var personFactory = {};

  function sendPayload(formData, method, url) {
    var deferred = $q.defer();
    console.log(formData);
    Upload.upload({
      url: url,
      method: method,
      fields: formData,
      file: formData.person.image,
      fileFormDataName: 'person[image]',
    })
    .then(function (resp) {
        deferred.resolve(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    });
    return deferred.promise;
  }

  personFactory.getPeople = function() {
    var deferred = $q.defer();
    Person.query(function(people) {
      personFactory.people = people;
      deferred.resolve(personFactory.people);
    });
    return deferred.promise;
  };

  personFactory.getPerson = function(id) {
    var deferred = $q.defer();
    Person.get({id: id}, function(person) {
      deferred.resolve(person);
    });
    return deferred.promise;
  };

  personFactory.deletePerson = function(id) {
    var deferred = $q.defer();
    Person.delete({id: id}, function(person) {
      if (person) {
        deferred.resolve(person);
      }
    });
    return deferred.promise;
  };

  personFactory.createWithAttachment = function(formData) {
    var deferred = $q.defer();
    sendPayload(formData, "POST", "//localhost:3000/api/people").then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  personFactory.updateWithAttachment = function(formData) {
    var deferred = $q.defer();
    sendPayload(formData, "PUT", "//localhost:3000/api/people/" + formData.person.id).then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

    return personFactory;
  }]);
