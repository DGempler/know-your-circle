(function() {
  angular.module('knowYourCircle.people')
  .factory('Share', Share);

  Share.$inject = ['$resource'];

  function Share($resource) {
    return $resource('/api/share/');
  }
})();