(function() {
  angular.module('memPeeps.auth')
    .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$uibModal', '$auth', '$location'];

    function AuthFactory($uibModal, $auth, $location) {
      var factory = {};

      factory.logInOpen = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_login_modal.html',
          controller: 'loginController as auth',
          size: 'sm',
          windowClass: "modal fade"
        });
      };

      factory.signUpOpen = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_signup_modal.html',
          controller: 'signupController as auth',
          size: 'sm',
          windowClass: "modal fade"
        });
      };

      factory.logOut = function() {
        $auth.signOut()
          .then(function(resp) {
            console.log('logged out!');
            $location.path('/');
          })
          .catch(function(error) {
            console.log(error);
            $location.path('/');
          });
      };

      return factory;
    }



})();