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
        var payLoad = {};
        var selected = Object.keys(vm.selected);

        payLoad.email = vm.email;
        payLoad.groups = selected;

        ShareFactory.shareGroups(payLoad)
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