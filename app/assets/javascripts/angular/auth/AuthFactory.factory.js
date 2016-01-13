(function() {
  angular.module('knowYourCircle.auth')
    .factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$uibModal', '$auth', '$location', '$q', '$rootScope', 'Upload', 'Message'];

    function AuthFactory($uibModal, $auth, $location, $q, $rootScope, Upload, Message) {
      var factory = {};

      function logoutSuccess() {
        $location.path('/');
        var message = "You have been logged out.";
        Message.open(message);
      }

      function logoutError() {
        var message = 'There was an error logging you out. Please refresh the page and try again.';
        Message.open(message);
      }

      function createModalInstance(fileName, controllerName, resolveObject) {
        return $uibModal.open({
          animation: true,
          templateUrl: '/partials/auth/' + fileName + '.html',
          controller: controllerName,
          size: 'sm',
          windowClass: "modal fade",
          resolve: resolveObject
        });
      }

      function sendPayload(user) {
        return Upload.upload({
          url: 'api/auth',
          method: 'PUT',
          fields: user,
          arrayKey: '[]',
          file: user.image,
          fileFormDataName: 'user[image]',
        });
      }

      factory.logOut = function() {
        $auth.signOut()
          .then(function(resp) {
            logoutSuccess();
          })
          .catch(function(error) {
            logoutError();
          });
      };

      factory.logInOpen = function() {
        var fileName = '_login_modal';
        var controllerName = 'loginController as auth';
        var size = 'sm';

        createModalInstance(fileName, controllerName);
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
        var fileName = '_signup_modal';
        var controllerName = 'signupController as auth';
        var size = 'sm';
        var resolve = {
          email: function() {
            return email;
          }
        };

        createModalInstance(fileName, controllerName, resolve);
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

      factory.openChangePasswordModal = function() {
        var fileName = '_changePassword_modal';
        var controllerName = 'changePasswordController as password';

        createModalInstance(fileName, controllerName);
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
        sendPayload(user)
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