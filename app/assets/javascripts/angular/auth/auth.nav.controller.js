(function() {
  angular.module('memPeeps.auth')
    .controller('navController', navController);

  navController.$inject = ['$uibModal'];

  function navController($uibModal) {
    var vm = this;

    vm.loginOpen = function() {


      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '/partials/auth/_login_modal.html',
        controller: 'loginController as auth',
        size: 'sm'
      });

    };

  }


})();