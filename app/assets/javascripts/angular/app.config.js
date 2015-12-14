(function() {
  angular.module('memPeeps')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function config($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'partials/index.html',
      })
      .when('/people/index', {
        templateUrl: 'partials/people/index.html',
        controller: 'peopleIndexController as people',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/people/new', {
        templateUrl: 'partials/people/new.html',
        controller: 'personNewController as person',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/people/show/:id', {
        templateUrl: 'partials/people/show.html',
        controller: 'personShowController as person',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/people/:id/edit', {
        templateUrl: 'partials/people/edit.html',
        controller: 'personEditController as person',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/games/index', {
        templateUrl: 'partials/games/index.html',
        controller: 'gamesIndexController as games',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/profile', {
        templateUrl: 'partials/users/profile.html',
        controller: 'profileController as profile',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .when('/profile/edit', {
        templateUrl: 'partials/users/edit.profile.html',
        controller: 'editProfileController as profile',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  }
})();