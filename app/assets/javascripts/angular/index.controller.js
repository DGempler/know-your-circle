(function() {
  angular.module('knowYourCircle')
    .controller('indexController', indexController);

    indexController.$inject = ['AuthFactory'];

    function indexController(AuthFactory) {
      var vm = this;

      vm.logInModalOpen = function() {
        AuthFactory.logInOpen();
      };
    }

})();