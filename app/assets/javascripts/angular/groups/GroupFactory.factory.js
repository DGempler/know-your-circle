(function() {
  angular.module('memPeeps.groups')
    .factory('GroupFactory', GroupFactory);

    GroupFactory.$inject = ['$uibModal', '$q', 'Group'];

    function GroupFactory($uibModal, $q, Group) {
      var factory = {};

      factory.openNewGroupModal = function(groups) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/partials/groups/_group_new_modal.html',
          controller: 'groupNewController as modal',
          windowClass: "modal fade",
          size: 'sm',
          resolve: {
            groups: function() {
              return groups;
            }
          }
        });
      };

      factory.submitNewGroup = function(group) {
        var deferred = $q.defer();
        var newGroup = new Group(group);
        newGroup.$save
          .then(function(res) {
          console.log(res);
          deferred.resolve(res);
        })
          .catch(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };

      return factory;
    }
})();