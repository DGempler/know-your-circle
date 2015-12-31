(function() {
  angular.module('knowYourCircle.groups')
    .controller('shareSelectedController', shareSelectedController);

    shareSelectedController.$inject = ['$uibModalInstance', 'people', 'size', 'ShareFactory', 'AuthFactory'];

    function shareSelectedController($uibModalInstance, people, size, ShareFactory, AuthFactory) {
      var vm = this;
      vm.people = people;

      if (size !== 'sm') {
        vm.mediumSize = true;
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.send = function() {
        var payload = {};
        payload.people_ids = [];
        vm.people.forEach(function(person) {
          payload.people_ids.push(person.id);
        });

        payload.email = vm.email;

        ShareFactory.share(payload)
          .then(function(success) {
            var message = 'Your selected people have been sent to ' + vm.email;
            AuthFactory.messageModalOpen(message);
            vm.email = "";
          })
          .catch(function(error) {
            var message = 'There was an error while sharing your people. Please try again.';
            AuthFactory.messageModalOpen(message);
          });
      };

    }

})();