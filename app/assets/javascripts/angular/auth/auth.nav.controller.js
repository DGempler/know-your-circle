(function() {
  angular.module('memPeeps.auth')
    .controller('navController', navController);

  navController.$inject = ['$uibModal', '$auth'];

  function navController($uibModal, $auth) {
    var vm = this;

    vm.loginOpen = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_login_modal.html',
        controller: 'loginController as auth',
        size: 'sm'
      });

    };

    vm.signUp = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_signup_modal.html',
        controller: 'signupController as auth',
        size: 'sm'
      });
    };

    vm.logout = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

  }


})();