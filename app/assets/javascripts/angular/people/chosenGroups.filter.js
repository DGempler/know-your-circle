(function() {
  angular.module('knowYourCircle.people')
    .filter('chosenGroups', chosenGroups);

    function chosenGroups() {
      return function(allGroups, chosenGroupIds) {
        if (allGroups) {
          var showGroups = [];
          allGroups.forEach(function(group) {
            if (chosenGroupIds.indexOf(group.id) !== -1) {
              showGroups.push(group);
            }
          });
          return showGroups;
        }
      };
    }
})();