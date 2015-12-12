(function() {
  angular.module('memPeeps.auth')
    .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$uibModal', '$auth', '$location', '$q'];

    function AuthFactory($uibModal, $auth, $location, $q) {
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
        var deferred = $q.defer();
        $auth.submitLogin(user)
          .then(function(resp) {
            modal.close();
            $location.path('/people/index');
          })
          .catch(function(error) {
            deferred.reject(error);
          });
          return deferred.promise;
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
        var deferred = $q.defer();
        $auth.submitRegistration(user)
          .then(function(resp) {
            modal.close();
            factory.confirmEmailModalOpen(resp.data.data.email);
          })
          .catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      };

      factory.logOut = function() {
        $auth.signOut()
          .then(function(resp) {
            $location.path('/');
            factory.logOutSuccessModalOpen();
          })
          .catch(function(error) {
            console.log(error);
            $location.path('/');
          });
      };

      factory.openChangePasswordModal = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'partials/auth/_changePassword_modal.html',
          controller: 'changePasswordController as password',
          size: 'sm',
          windowClass: "modal fade"
        });
      };

      factory.submitChangePassword = function(user, modal) {
        var deferred = $q.defer();
        $auth.updatePassword(user)
          .then(function(res) {
            modal.close();
            factory.passwordChangeSuccessModalOpen();
          })
          .catch(function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
      };

      factory.passwordChangeSuccessModalOpen = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_passwordChangeSuccess_modal.html',
          controller: 'passwordChangeSuccessController as password',
          windowClass: "modal fade"
        });
      };

      factory.confirmEmailModalOpen = function(email) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_confirmEmail_modal.html',
          controller: 'confirmEmailController as confirm',
          windowClass: "modal fade",
          resolve: {
            email: function() {
              return email;
            }
          }
        });
      };

      factory.logOutSuccessModalOpen = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_logOutSuccess_modal.html',
          controller: 'logOutSuccessController as logout',
          windowClass: "modal fade"
        });
      };

      return factory;
    }



})();