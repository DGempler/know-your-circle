(function() {
  angular.module('memPeeps.auth')
    .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$uibModal', '$auth', '$location', '$q', '$rootScope', 'Upload'];

    function AuthFactory($uibModal, $auth, $location, $q, $rootScope, Upload) {
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
            var message = "You have been logged out.";
            factory.messageModalOpen(message);
          })
          .catch(function(error) {
            var message = 'There was an error logging you out. Please try again';
            factory.messageModalOpen(message);
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
            var message = "Your password has been successfully updated.";
            factory.messageModalOpen(message);
          })
          .catch(function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
      };

      factory.messageModalOpen = function(message) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_message_modal.html',
          controller: 'messageController as message',
          windowClass: "modal fade",
          resolve: {
            message: function() {
              return message;
            }
          }
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

      factory.updateUser = function(user) {
        $auth.updateAccount(user)
          .then(function(res) {
            $location.path('/profile');
          })
          .catch(function(err) {
            var message = 'An error occured while trying update your information. Please try again.';
            factory.messageModalOpen(message);
          });
      };

      factory.updateUserWithImage = function(user) {
        Upload.upload({
          url: 'api/auth',
          method: 'PUT',
          headers: $auth.retrieveData('auth_headers'),
          fields: user,
          arrayKey: '[]',
          file: user.image,
          fileFormDataName: 'user[image]',
        })
        .then(function (resp) {
          $rootScope.user = resp.data.data;
          $location.path('/profile');
        }, function (err) {
          var message = 'An error occured while trying to update your information. Please try again.';
          factory.messageModalOpen(message);
        });
      };

      factory.deleteUser = function() {
        $auth.destroyAccount()
        .then(function(res) {
          console.log(res);
          $location.path('/');
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/');
        });
      };

      return factory;
    }



})();