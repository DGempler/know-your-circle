(function() {
  angular.module('knowYourCircle.groups')
    .controller('shareSelectedController', shareSelectedController);

    shareSelectedController.$inject = ['$uibModalInstance', 'people', 'ShareFactory', 'AuthFactory'];

    function shareSelectedController($uibModalInstance, people, ShareFactory, AuthFactory) {
      var vm = this;
      vm.people = people;

      if (people.length === 0) {
        // DO SOMETHING!!!
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.send = function(id) {
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
          })
          .catch(function(error) {
            var message = 'There was an error while sharing your people. Please try again.';
            AuthFactory.messageModalOpen(message);
          });
      };

    }

})();