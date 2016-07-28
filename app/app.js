"use strict";

//Set angular module
var app = angular.module('FECAP', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider) {

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
