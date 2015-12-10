(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject = ['$rootScope'];

  function profileController($rootScope) {
    var vm = this;
    vm.user = {};

    function copyUser() {
      for (var prop in $rootScope.user) {
        vm.user[prop] = $rootScope.user[prop];
      }
      if ($rootScope.user.dob === 'null' || $rootScope.user.dob === null) {
        vm.user.dob = "";
      } else {
        vm.user.dob = moment($rootScope.user.dob).format("MMM Do YYYY");
      }
    }

    copyUser();

  }

})();