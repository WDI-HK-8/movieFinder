// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ng-token-auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.movies', {
    url: '/movies',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'MoviesSearchCtrl'
      }
    }
  })

  .state('app.singleMovie', {
    url: '/movies/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies-show.html',
        controller: 'MovieShowCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/movies');

  $authProvider.configure({
    // By default, you only need to configure apiUrl
    // Note that if you put a '/' at the end of the link, there will be errors when calling the api
    apiUrl: 'http://localhost:3000'
  })
});
