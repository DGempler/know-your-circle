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
      .when('/about', {
        templateUrl: 'partials/about.html'
      })
      .when('/people/demo', {
        templateUrl: 'partials/people/people_index.html',
        controller: 'peopleDemoController as people'
      })
      .when('/people/demo/show/:id', {
        templateUrl: 'partials/people/people_show.html',
        controller: 'peopleDemoShowController as person',
      })
      .when('/people/index', {
        templateUrl: 'partials/people/people_index.html',
        controller: 'peopleIndexController as people',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/new', {
        templateUrl: 'partials/people/people_new.html',
        controller: 'peopleNewController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/show/:id', {
        templateUrl: 'partials/people/people_show.html',
        controller: 'personShowController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/:id/edit', {
        templateUrl: 'partials/people/people_edit.html',
        controller: 'personEditController as person',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/games/index/:demo', {
        templateUrl: 'partials/games/games_index.html',
        controller: 'gamesIndexController as games'
      })
      .when('/profile', {
        templateUrl: 'partials/users/user_profile.html',
        controller: 'profileController as profile',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/profile/edit/:first', {
        templateUrl: 'partials/users/user_profile_edit.html',
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