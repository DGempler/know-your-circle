(function() {
  angular.module('memPeeps.people')
    .filter('showPerson', showPerson);

    function showPerson() {
      return function(people) {
        if (people) {
          var showPeople = [];
          people.forEach(function(person) {
            if (person.show) {
              showPeople.push(person);
            }
          });
          return showPeople;
        }
      };
    }
})();