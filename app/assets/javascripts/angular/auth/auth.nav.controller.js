(function() {
  angular.module('memPeeps.auth')
    .controller('navController', navController);

  navController.$inject = ['$uibModal', '$auth', 'AuthFactory', '$location'];

  function navController($uibModal, $auth, AuthFactory, $location) {
    var vm = this;

    vm.logInOpen = function() {
      AuthFactory.logInOpen();
    };

    vm.signUpOpen = function() {
      AuthFactory.signUpOpen();
    };

    vm.logOut = function() {
      AuthFactory.logOut();
    };

  }


})();