(function() {
  angular.module('knowYourCircle.auth')
    .factory('Message', Message);

    Message.$inject = ['$uibModal'];

    function Message($uibModal) {
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
          templateUrl: '/partials/users/_confirmMessage_modal.html',
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


      return factory;
    }



})();