(function() {
  angular.module('knowYourCircle')
    .controller('indexController', indexController);

    indexController.$inject = ['AuthFactory', '$routeParams'];

    function indexController(AuthFactory, $routeParams) {
      var vm = this;
      if ($routeParams.email) {
        AuthFactory.signUpOpen($routeParams.email);
      }
    }

})();