"use strict";

//Set angular module
const app = angular.module('FECAP', ['ngRoute']);

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
  otherwise('/home');

});//End app.config
