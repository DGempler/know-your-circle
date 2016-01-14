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

      function checkIfEmailMatchesExisting() {
        if (vm.email.toLowerCase() === $rootScope.user.email) {
          vm.emailsMatch = true;
          return true;
        } else {
          vm.emailsMatch = false;
        }
      }

      function setSelectedGroups(selected) {
        selected = Object.keys(vm.selected);
        if (selected.length === 0) {
          vm.noneSelected = true;
          return false;
        } else {
          vm.noneSelected = false;
          return true;
        }
      }

      function sendPayload(payload) {
        Share.share(payload)
          .then(function(success) {
            var message = 'The people in your selected groups have been sent to ' + vm.email;
            Message.open(message);
            vm.email = "";
          })
          .catch(function(error) {
            var message;
            if (error.data.error) {
              message = error.data.error;
            } else {
              message = 'There was an error while sharing the people in your selected groups. Please try again.';
            }
            Message.open(message);
          })
          .finally(function() {
            vm.busy = false;
          });
      }

      function prepPayloadAndSend(selected) {
        vm.busy = true;
        var payload = {};
        payload.email = vm.email;
        payload.group_ids = selected;

        sendPayload(payload);
      }

      vm.send = function() {
        var selected;
        if (checkIfEmailMatchesExisting()) {
          return;
        }

        if (!setSelectedGroups(selected)) {
          return;
        }

        prepPayloadAndSend(selected);

      };

      initialize();

    }

})();