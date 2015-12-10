(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject=['$rootScope'];

  function profileController($rootScope) {
    var vm = this;
    vm.user = $rootScope.user;

  }

})();