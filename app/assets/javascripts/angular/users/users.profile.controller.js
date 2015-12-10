(function() {
  angular.module('memPeeps.users')
    .controller('profileController', profileController);

  profileController.$inject=[];

  function profileController($auth) {
    var vm = this;

    vm.addInputFields = function() {
      vm.addedInputFields = true;
    };


  }

})();