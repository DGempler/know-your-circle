(function() {
  angular.module('knowYourCircle.users')
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

      factory.welcomeModalOpen = function(name) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/users/_welcome_modal.html',
          controller: 'welcomeController as welcome',
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