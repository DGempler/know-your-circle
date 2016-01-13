(function() {
  angular.module('knowYourCircle.messages')
    .factory('Message', Message);

    Message.$inject = ['$uibModal', '$q'];

    function Message($uibModal, $q) {
      var factory = {};

      function createModalInstance(fileName, controllerName, resolveObject) {
        return $uibModal.open({
          animation: true,
          templateUrl: '/partials/messages/' + fileName + '.html',
          controller: controllerName + ' as message',
          windowClass: "modal fade",
          resolve: resolveObject
        });
      }

      factory.open = function(message, email) {
        var fileName = '_message_modal';
        var controllerName = 'messageController';
        var resolve = {
          message: function() {
            return message;
          },
          email: function() {
            return email;
          }
        };

        createModalInstance(fileName, controllerName, resolve);
      };

      factory.openConfirm = function(message) {
        var deferred = $q.defer();

        var fileName = '_confirmMessage_modal';
        var controllerName = 'confirmMessageController';
        var modalInstance;
        var resolve = {
          message: function() {
            return message;
          }
        };

        modalInstance = createModalInstance(fileName, controllerName, resolve);

        modalInstance.result.then(function() {
          deferred.resolve();
        }, function() {
          deferred.reject();
        });

        return deferred.promise;
      };

      factory.openWelcome = function(name) {
        var fileName = '_welcome_modal';
        var controllerName = 'welcomeController';
        var resolve = {
          name: function() {
            return name;
          }
        };

        createModalInstance(fileName, controllerName, resolve);
      };

      return factory;
    }

})();