(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject=['$rootScope', '$auth'];

  function profileController($rootScope, $auth) {
    var vm = this;
    vm.user = $rootScope.user;
    if ($rootScope.user.dob) {
      vm.user.dob = new Date($rootScope.user.dob);
    }

    vm.submitUserUpdateAccount = function() {
      $auth.updateAccount(vm.user)
        .then(function(res) {
          vm.user = res.data.data;
          if (res.data.data.dob) {
            vm.user.dob = new Date(res.data.data.dob);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    };
  }

})();