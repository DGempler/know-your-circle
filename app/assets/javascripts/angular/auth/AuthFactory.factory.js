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

      factory.openLogInModal = function(modal) {
        modal.close();
        setTimeout(function() {
          factory.logInOpen();
        }, 500);
      };

      factory.logIn = function(user, modal) {
        $auth.submitLogin(user)
          .then(function(resp) {
            modal.close();
            alert("Thank you for logging in!");
            console.log(resp);
          })
          .catch(function(error) {
            alert("Sorry, there was an error.");
            console.log(error);
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

      factory.openSignUpModal = function(modal) {
        modal.close();
        setTimeout(function() {
          factory.signUpOpen();
        }, 500);
      };

      factory.signUp = function(user, modal) {
        $auth.submitRegistration(user)
          .then(function(resp) {
            modal.close();
            alert("A confirmation email has been sent to " + resp.data.data.email);
          })
          .catch(function(error) {
            alert("There was an error! Please try again!");
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