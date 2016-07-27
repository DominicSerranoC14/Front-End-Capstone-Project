"use strict";

//Set angular module
const app = angular.module('FECAP', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home-view.html',
    controller: 'HomeViewCtrl'
  }).
  otherwise('/home');

});//End app.config
