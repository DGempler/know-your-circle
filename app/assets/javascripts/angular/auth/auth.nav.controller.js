(function() {
  angular.module('memPeeps.auth')
    .controller('navController', navController);

  navController.$inject = ['$uibModal', '$auth', 'AuthFactory', '$location'];

  function navController($uibModal, $auth, AuthFactory, $location) {
    var vm = this;

    vm.logInOpen = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_login_modal.html',
        controller: 'loginController as auth',
        size: 'sm',
        windowClass: "modal fade"
      });

    };

    vm.signUpOpen = function() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_signup_modal.html',
        controller: 'signupController as auth',
        size: 'sm',
        windowClass: "modal fade"
      });
    };

    vm.logOut = function() {
      $auth.signOut()
        .then(function(resp) {
          $location.path('/');
        })
        .catch(function(error) {
          console.log(error);
          $location.path('/');
        });
    };

    AuthFactory.logInOpen = function() {
      vm.logInOpen();
    };

    AuthFactory.signUpOpen = function() {
      vm.signUpOpen();
    };

  }


})();