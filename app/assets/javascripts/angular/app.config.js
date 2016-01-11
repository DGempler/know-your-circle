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
        controller: 'demoIndexController as index'
      })
      .when('/people/demo/show/:id', {
        templateUrl: 'partials/people/people_show.html',
        controller: 'demoShowController as show',
      })
      .when('/people/index', {
        templateUrl: 'partials/people/people_index.html',
        controller: 'peopleIndexController as index',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/new', {
        templateUrl: 'partials/people/people_new.html',
        controller: 'peopleNewController as new',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/show/:id', {
        templateUrl: 'partials/people/people_show.html',
        controller: 'peopleShowController as show',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/people/:id/edit', {
        templateUrl: 'partials/people/people_edit.html',
        controller: 'peopleEditController as edit',
        resolve: {
          auth: ['$auth', function($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/games/index/:demo', {
        templateUrl: 'partials/games/games_index.html',
        controller: 'gamesIndexController as index'
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