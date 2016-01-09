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

      return factory;
    }



})();