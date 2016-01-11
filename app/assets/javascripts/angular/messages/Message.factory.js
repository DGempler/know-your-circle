(function() {
  angular.module('knowYourCircle.messages')
    .factory('Message', Message);

    Message.$inject = ['$uibModal', '$q'];

    function Message($uibModal, $q) {
      var factory = {};

      factory.open = function(message, email) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/messages/_message_modal.html',
          controller: 'messageController as message',
          windowClass: "modal fade",
          resolve: {
            message: function() {
              return message;
            },
            email: function() {
              return email;
            }
          }
        });
      };

      factory.openConfirm = function(message) {
        var deferred = $q.defer();
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/messages/_confirmMessage_modal.html',
          controller: 'confirmMessageController as message',
          windowClass: "modal fade",
          resolve: {
            message: function() {
              return message;
            }
          }
        });
        modalInstance.result.then(function() {
          deferred.resolve();
        }, function() {
          deferred.reject();
        });
        return deferred.promise;
      };

      factory.openWelcome = function(name) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/messages/_welcome_modal.html',
          controller: 'welcomeController as message',
          windowClass: "modal fade",
          resolve: {
            name: function() {
              return name;
            }
          }
        });
      };

      return factory;
    }



})();