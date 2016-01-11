(function() {
  angular.module('knowYourCircle.users')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$uibModal', '$q'];

    function UserFactory($uibModal, $q) {
      var factory = {};

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