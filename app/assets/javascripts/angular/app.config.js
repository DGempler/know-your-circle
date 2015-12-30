(function() {
  angular.module('knowYourCircle')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function config($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'indexController as index'
      })
      .when('/people/demo', {
        templateUrl: 'partials/people/index.html',
        controller: 'peopleDemoController as people'
      })
      .when('/people/demo/show/:id', {
        templateUrl: 'partials/people/show.html',
        controller: 'personDemoShowController as person',
      })
      .when('/people/index', {
        templateUrl: 'partials/people/index.html',
        controller: 'peopleIndexController as people',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/new', {
        templateUrl: 'partials/people/new.html',
        controller: 'personNewController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/show/:id', {
        templateUrl: 'partials/people/show.html',
        controller: 'personShowController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/:id/edit', {
        templateUrl: 'partials/people/edit.html',
        controller: 'personEditController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/games/index/:demo', {
        templateUrl: 'partials/games/index.html',
        controller: 'gamesIndexController as games'
      })
      .when('/profile', {
        templateUrl: 'partials/users/profile.html',
        controller: 'profileController as profile',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/profile/edit', {
        templateUrl: 'partials/users/edit.profile.html',
        controller: 'editProfileController as profile',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  }
})();