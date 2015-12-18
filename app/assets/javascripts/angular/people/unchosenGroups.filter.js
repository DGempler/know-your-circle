(function() {
  angular.module('memPeeps.people')
    .filter('unchosenGroups', unchosenGroups);

    function unchosenGroups() {
      return function(allGroups, chosenGroupIds) {
        if (allGroups) {
          var showGroups = [];
          allGroups.forEach(function(group) {
            if (chosenGroupIds.indexOf(group.id) === -1) {
              showGroups.push(group);
            }
          });
          return showGroups;
        }
      };
    }
})();