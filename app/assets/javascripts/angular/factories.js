angular.module('memPeeps')
.factory('Person', ['$resource', function($resource) {
  return $resource('//localhost:3000/api/people/:id');
}])
.factory('PersonFactory', ['Person', 'Upload', function(Person, Upload) {
  var personFactory = {};

    // personFactory.people = Person.query();

  function sendPayload(formData, method, url) {

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
    });
  }

  personFactory.createWithAttachment = function(formData) {
    sendPayload(formData, "POST", "//localhost:3000/api/people");
  };


    return personFactory;
  }]);
