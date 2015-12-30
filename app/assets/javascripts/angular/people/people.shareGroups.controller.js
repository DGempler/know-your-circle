(function() {
  angular.module('knowYourCircle.groups')
    .controller('shareGroupsController', shareGroupsController);

    shareGroupsController.$inject = ['$uibModalInstance', 'groups', 'ShareFactory', 'AuthFactory'];

    function shareGroupsController($uibModalInstance, groups, ShareFactory, AuthFactory) {
      var vm = this;
      vm.groups = groups;
      vm.selected = {};

      vm.close = function() {
        $uibModalInstance.close(vm.group.groups);
      };

      vm.selectGroup = function(id) {
        if (vm.selected[id]) {
          delete vm.selected[id];
        } else {
          vm.selected[id] = true;
        }
      };

      vm.send = function(id) {
        var payload = {};
        // payload.user = {};
        var selected = Object.keys(vm.selected);

        if (selected.length === 0) {
          // DO SOMETHING!!!!
        }

        payload.email = vm.email;
        payload.group_ids = selected;

        ShareFactory.shareGroups(payload)
          .then(function(success) {
            var message = 'Your selected groups have been sent to ' + vm.email;
            AuthFactory.messageModalOpen(message);
          })
          .catch(function(error) {
            var message = 'There was an error while sharing your groups. Please try again.';
            AuthFactory.messageModalOpen(message);
          });
      };

    }

})();