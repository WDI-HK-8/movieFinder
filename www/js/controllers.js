angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $ionicPopup, $state) {

  var validateUser = function(){
    $scope.currentUser = JSON.parse(window.localStorage['current-user'] || '{}');
    $scope.loggedIn = $scope.currentUser ? true : false
    console.log('current user:', $scope.currentUser);
  };

  // Form data for the login modal
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  $scope.login = function() {
    $scope.loginModal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $auth.submitLogin($scope.loginData)
      .then(function(resp) {
        window.localStorage['current-user'] = JSON.stringify(resp);
        validateUser();
        $scope.closeLogin();
      })
      .catch(function(resp) {
        $ionicPopup.alert({
          title: 'Wrong Email and Password',
          template: 'Please try again'
        });
      });
  };

  $scope.doLogout = function() {
    console.log('Doing logout');

    window.localStorage['current-user'] = null;
    validateUser();
  };

  // Form data for the signup modal
  $scope.signupData = {};

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signupModal = modal;
  });

  $scope.closeSignup = function() {
    $scope.signupModal.hide();
  };

  $scope.signup = function() {
    $scope.signupModal.show();
  };

  $scope.doSignup = function() {
    console.log('Doing login', $scope.signupData);

    $auth.submitRegistration($scope.signupData).
      then(function(resp) {
       console.log(resp);
      }).
      catch(function(resp) {
       console.log(resp);
      });
  };
})

.controller('MovieShowCtrl', function($scope, $stateParams, $http) {
  $scope.movieForm = {};
  $scope.ready = false;

  $http.get('http://www.omdbapi.com/?i=' + $stateParams.id).success(function(response){
    console.log(response);
    $scope.movie = response;
    $scope.ready = true;
  });
})

.controller('MoviesSearchCtrl', function($scope, $stateParams, $http) {
  $scope.movieForm = {};
  $scope.ready = false;

  $scope.movieForm.searchMovie = function(){
    $scope.searching = true;

    $http.get('http://www.omdbapi.com/?s=' + $scope.movieForm.movieName).success(function(response){
      console.log(response.Search);
      $scope.movies = response.Search;
      $scope.searching = false;
      $scope.ready = true;
    });
  };
});
