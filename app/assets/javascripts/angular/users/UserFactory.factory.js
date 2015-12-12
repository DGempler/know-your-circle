(function() {
  angular.module('memPeeps.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal', '$q'];

    function UserFactory($uibModal, $q) {
      var factory = {};

      factory.confirmMessageModalOpen = function(message) {
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