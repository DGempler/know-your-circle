(function() {
  angular.module('knowYourCircle.auth')
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

      factory.logIn = function(user) {
        var deferred = $q.defer();
        $auth.submitLogin(user)
          .then(function(resp) {
            deferred.resolve();
          })
          .catch(function(error) {
            deferred.reject(error);
          });
          return deferred.promise;
      };


      factory.signUpOpen = function(email) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/_signup_modal.html',
          controller: 'signupController as auth',
          size: 'sm',
          windowClass: "modal fade",
          resolve: {
            email: function() {
              return email;
            }
          }
        });
      };

      factory.openSignUpModal = function(modal) {
        modal.close();
        setTimeout(function() {
          factory.signUpOpen();
        }, 500);
      };

      factory.signUp = function(user) {
        var deferred = $q.defer();
        $auth.submitRegistration(user)
          .then(function(resp) {
            deferred.resolve(resp.data.data.email);
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
            var message = 'There was an error logging you out. Please refresh the page and try again.';
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

      factory.submitChangePassword = function(user) {
        var deferred = $q.defer();
        $auth.updatePassword(user)
          .then(function(res) {
            deferred.resolve();
          })
          .catch(function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
      };

      factory.updateUser = function(user) {
        var deferred = $q.defer();
        $auth.updateAccount(user)
          .then(function(res) {
            $rootScope.user = res.data.data;
            deferred.resolve();
          })
          .catch(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };

      factory.updateUserWithImage = function(user) {
        var deferred = $q.defer();
        Upload.upload({
          url: 'api/auth',
          method: 'PUT',
          fields: user,
          arrayKey: '[]',
          file: user.image,
          fileFormDataName: 'user[image]',
        })
        .then(function (resp) {
          $rootScope.user = resp.data.data;
          deferred.resolve();
        }, function (err) {
          deferred.reject();
        });
        return deferred.promise;
      };

      factory.deleteUser = function() {
        var deferred = $q.defer();
        $auth.destroyAccount()
          .then(function(res) {
            deferred.resolve();
          })
          .catch(function(err) {
            deferred.reject();
          });
        return deferred.promise;
      };

      return factory;
    }



})();