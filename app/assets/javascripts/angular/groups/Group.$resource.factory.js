(function() {
  angular.module('knowYourCircle.groups')
  .factory('Group', Group);

  Group.$inject = ['$resource'];

  function Group($resource) {
    return $resource('/api/groups/:id', null, {
      update: {
        method:'PUT'
      }
    });
  }
})();