(function() {
  angular.module('memPeeps.groups')
  .factory('Group', Group);

  Group.$inject = ['$resource'];

  function Group($resource) {
    return $resource('//localhost:3000/api/groups/:id', null, {
      update: {
        method:'PUT'
      }
    });
  }
})();