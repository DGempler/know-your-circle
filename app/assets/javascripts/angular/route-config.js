angular.module('memPeeps')
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

function config($routeProvider, $locationProvider, $httpProvider) {

  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  $routeProvider
    .when('/', {
      templateUrl: 'partials/index.html',
      controller: 'homeController'
    })
    .when('/people/index', {
      templateUrl: 'partials/people/index.html',
      controller: 'peopleIndexController'
    })
    .when('/people/new', {
      templateUrl: 'partials/people/new.html',
      controller: 'personNewController'
    })
    .when('/people/show/:id', {
      templateUrl: 'partials/people/show.html',
      controller: 'personShowController'
    })
    .when('/people/:id/edit', {
      templateUrl: 'partials/people/edit.html',
      controller: 'personEditController'
    })
    .when('/games/index', {
      templateUrl: 'partials/games/index.html',
      controller: 'gamesIndexController'
    })
    .when('/games/flashcards', {
      templateUrl: 'partials/games/flashcards.html',
      controller: 'gamesFlashcardsController'
    })
    .otherwise({
      redirectTo: '/'
    });

}