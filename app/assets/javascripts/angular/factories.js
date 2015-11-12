angular.module('memPeeps')
.factory('Person', ['$resource', function($resource) {
  return $resource('//localhost:3000/api/people/:id');
}])
.factory('PersonFactory', ['Person', 'Upload', '$q', function(Person, Upload, $q) {
  var personFactory = {};

  personFactory.getPeople = function() {
    var deferred = $q.defer();
    Person.query(function(people) {
      personFactory.people = people;
      deferred.resolve(personFactory.people);
    });
    return deferred.promise;
  };

  function sendPayload(formData, method, url) {
    var deferred = $q.defer();

    Upload.upload({
      url: url,
      method: method,
      fields: formData,
      file: formData.image,
      fileFormDataName: 'person[image]',
      formDataAppender: function(fd, key, val) {
        if (angular.isArray(val)) {
          angular.forEach(val, function(v) {
            fd.append('person['+key+']', v);
          });
        } else {
          fd.append('person['+key+']', val);
        }
      }
    })
    .then(function (resp) {
        deferred.resolve(resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    });
    return deferred.promise;
  }

  personFactory.createWithAttachment = function(formData) {
    var deferred = $q.defer();
    sendPayload(formData, "POST", "//localhost:3000/api/people").then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };


    return personFactory;
  }]);
