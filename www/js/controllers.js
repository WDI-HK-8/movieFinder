// var URL = "http://localhost:3000";
var URL = "https://movie-finder-api.herokuapp.com";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $ionicPopup, $state, $window) {

  var validateUser = function(){
    $scope.currentUser = JSON.parse($window.localStorage.getItem('current-user') || '{}');
    $scope.loggedIn = $scope.currentUser ? true : false
    console.log('current user:', $scope.currentUser);
  };

  validateUser();

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
        $window.localStorage.setItem('current-user', JSON.stringify(resp));
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

    $window.localStorage.setItem('current-user', null);
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
        $ionicPopup.alert({
          title: 'Success!',
          template: 'You are now logged in!'
        });

        $scope.closeSignup();
      }).
      catch(function(resp) {
        $ionicPopup.alert({
          message: resp
        });
      });
  };
})

.controller('MovieShowCtrl', function($scope, $stateParams, $http) {
  $scope.movieForm = {};

  $http.get(URL + '/movies/' + $stateParams.id).success(function(response){
    console.log(response);
    $scope.movie = response;
  });

  if ($scope.loggedIn) {
    $http.get(URL + '/users/' + $scope.currentUser.id + '/likes?omdb_id=' + $stateParams.id).success(function(response){
      if (response.length > 0 ){
        $scope.liked = true;
      }
    });
  }

  $scope.likeMovie = function(){
    if ($scope.loggedIn) {
      $http.post(URL + '/users/' + $scope.currentUser.id + '/likes', { like: { omdb_id: $stateParams.id, title: $scope.movie.Title} });
      $scope.liked = true;
    } else {
      $scope.login();
    }
  };
})

.controller('MoviesSearchCtrl', function($scope, $stateParams, $http) {
  $scope.movieForm = {};

  $scope.movieForm.searchMovie = function(){
    $http.get(URL + '/movies?query=' + $scope.movieForm.movieName).success(function(response){
      console.log(response.Search);
      $scope.movies = response.Search;
    }).error(function(response){
      console.log(response);
    });
  };
})

.controller('LikesIndexCtrl', function($scope, $stateParams, $http) {

  console.log("here")
  $http.get(URL + '/users/' + $scope.currentUser.id + '/likes').success(function(response){;
    console.log(response);
    $scope.likes = response;
  }).error(function(response){
    console.log(response);
  });
});
