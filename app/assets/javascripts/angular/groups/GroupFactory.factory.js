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
        var newGroup = new Group({ name: group });
        newGroup.$save()
          .then(function(res) {
            deferred.resolve(res);
          })
          .catch(function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };

      factory.getGroups = function() {
        var deferred = $q.defer();
        Group.query(function(groups) {
            deferred.resolve(groups);
          }, function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };

      factory.deleteGroup = function(id) {
        var deferred = $q.defer();
        Group.delete({id: id}, function(group) {
          deferred.resolve(group);
        }, function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      };

      return factory;
    }
})();