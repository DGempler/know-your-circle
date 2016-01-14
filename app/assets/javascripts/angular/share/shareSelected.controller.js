(function() {
  angular.module('knowYourCircle.share')
    .controller('shareSelectedController', shareSelectedController);

    shareSelectedController.$inject = ['$uibModalInstance', 'people', 'size', 'Share', 'Message', '$rootScope'];

    function shareSelectedController($uibModalInstance, people, size, Share, Message, $rootScope) {
      var vm = this;
      vm.people = people;

      function initialize() {
        if (size !== 'sm') {
          vm.mediumSize = true;
        }
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      function checkIfEmailMatchesUsers() {
        if (vm.email.toLowerCase() === $rootScope.user.email) {
          vm.emailsMatch = true;
          return true;
        } else {
          vm.emailsMatch = false;
        }
      }

      function addPeopleIds(payload) {
        payload.people_ids = [];
        vm.people.forEach(function(person) {
          payload.people_ids.push(person.id);
        });
      }

      function sendPayloadSuccess() {
        var message = 'Your selected people have been sent to ' + vm.email;
        Message.open(message);
        vm.email = "";
      }

      function sendPayloadError(error) {
        var message;
        if (error.data.error) {
          message = error.data.error;
        } else {
          message = 'There was an error while sharing your people. Please try again.';
        }
        Message.open(message);
      }

      function sendPayload(payload) {
        Share.share(payload)
          .then(function(success) {
            sendPayloadSuccess();
          })
          .catch(function(error) {
            sendPayloadError(error);
          })
          .finally(function() {
            vm.busy = false;
          });
      }

      function prepPayloadAndSend() {
        var payload = {};
        vm.busy = true;
        addPeopleIds(payload);
        payload.email = vm.email;
        sendPayload(payload);
      }

      vm.send = function() {
        if (checkIfEmailMatchesUsers()) {
          return;
        }
        prepPayloadAndSend();
      };

      initialize();

    }

})();