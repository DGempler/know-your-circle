(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject=['$rootScope', '$auth'];

  function profileController($rootScope, $auth) {
    var vm = this;
    vm.user = $rootScope.user;

    vm.submitUserUpdateAccount = function() {
      $auth.updateAccount(vm.user)
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }

})();