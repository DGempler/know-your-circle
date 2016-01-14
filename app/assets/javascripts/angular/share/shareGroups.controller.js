(function() {
  angular.module('knowYourCircle.share')
    .controller('shareGroupsController', shareGroupsController);

    shareGroupsController.$inject = ['$uibModalInstance', 'groups', 'size', 'Share', 'Message', '$rootScope'];

    function shareGroupsController($uibModalInstance, groups, size, Share, Message, $rootScope) {
      var vm = this;

      function initialize() {
        vm.groups = groups;
        vm.selected = {};

        if (size !== 'sm') {
          vm.mediumSize = true;
        }
      }

      function checkIfEmailMatchesUsers() {
        if (vm.email.toLowerCase() === $rootScope.user.email) {
          vm.emailsMatch = true;
          return true;
        } else {
          vm.emailsMatch = false;
        }
      }

      function setSelectedGroups(selected) {
        if (selected.length === 0) {
          vm.noneSelected = true;
          return false;
        } else {
          vm.noneSelected = false;
          return true;
        }
      }

      function sendPayloadSuccess() {
        var message = 'The people in your selected groups have been sent to ' + vm.email;
        Message.open(message);
        vm.email = "";
      }

      function sendPayloadError(error) {
        var message;
        if (error.data.error) {
          message = error.data.error;
        } else {
          message = 'There was an error while sharing the people in your selected groups. Please try again.';
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

      function prepPayloadAndSend(selected) {
        var payload = {};
        vm.busy = true;
        payload.email = vm.email;
        payload.group_ids = selected;
        sendPayload(payload);
      }

      vm.close = function() {
        $uibModalInstance.close();
      };

      vm.selectGroup = function(id) {
        if (vm.selected[id]) {
          delete vm.selected[id];
        } else {
          vm.selected[id] = true;
        }
      };

      vm.send = function() {
        var selected = Object.keys(vm.selected);
        if (!checkIfEmailMatchesUsers() && setSelectedGroups(selected)) {
          prepPayloadAndSend(selected);
        }
      };

      initialize();

    }

})();