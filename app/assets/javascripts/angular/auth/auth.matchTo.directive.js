(function() {
  angular.module('knowYourCircle.auth')
    .directive('matchTo', matchTo);

  function matchTo() {
    return {
      require: 'ngModel',
      scope: {
        otherValue: '=matchTo'
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.matchTo = function(value) {
          return value === scope.otherValue;
        };

        scope.$watch('otherValue', function() {
          ngModel.$validate();
        });
      }
    };
  }

})();