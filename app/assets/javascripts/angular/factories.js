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


/*
    personFactory.editWithAttachment: (formData, recordId)
    sendPayload(formData,
      "PUT",
      "https://myapi.com/my_resources/#{recordId}.json")

      options =
      url: url
      method: method
      file: file_attachment
      file_form_data_name: file_attachment.name ? ""
      fields:
      my_resource:
      title: formData.title
      body: formData.body

      Upload.upload(options)

    };


    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = Upload.upload({
        url: 'server/upload/url',
        method: 'POST',
          data: mydata,//it is the data that's need to be sent along with image
          file: file,
          fileFormDataName: 'myEntity[image]',//myEntity is the name of the entity in which image is saved and image is the name of the attachment
          formDataAppender: function(fd, key, val) {
            if (angular.isArray(val)) {
              angular.forEach(val, function(v) {
                fd.append('myEntity['+key+']', v);
              });
            } else {
              fd.append('myEntity['+key+']', val);
            }
          }
        });
    }

    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = Upload.upload({
        url: 'server/upload/url',
        method: 'POST',
        data: {name : $scope.name},
        file: file,
        fileFormDataName: 'user[image]',
        formDataAppender: function(fd, key, val) {
          if (angular.isArray(val)) {
            angular.forEach(val, function(v) {
              fd.append('user['+key+']', v);
            });
          } else {
            fd.append('user['+key+']', val);
          }
        }
      });
    }

    $scope.upload = function (files) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        $scope.upload = Upload.upload({
          url: 'server/upload/url',
          method: 'POST',
          fields: { 'user[name]': $scope.name },
          file: file,
          fileFormDataName: 'user[image]'
        });
      }
    }

*/



    return personFactory;
  }]);
