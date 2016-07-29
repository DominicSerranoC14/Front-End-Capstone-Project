"use strict";

//Set angular module
var app = angular.module('FECAP', ['ngRoute', 'ngMaterial'])
.constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");


app.config(function($routeProvider, FBCreds) {

  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain,
    databaseURL: FBCreds.databaseURL,
    storageBucket: FBCreds.storageBucket
  };
  firebase.initializeApp(authConfig);


  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home-view.html',
    controller: 'HomeViewCtrl'
  }).
  when('/view/customer', {
    templateUrl: 'partials/customer-view.html',
    controller: 'CustViewCtrl'
  }).
  when('/login', {
    templateUrl: 'partials/login-view.html',
    controller: 'LoginCtrl'
  }).
  otherwise('/home');

});//End app.config
