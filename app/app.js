"use strict";

//Set angular module
const app = angular.module('FECAP', ['ngRoute', 'ngMaterial'])
.constant('FirebaseURL', "https://front-end-capstone.firebaseio.com");


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
  when('/view/item', {
    templateUrl: 'partials/item-view.html',
    controller: 'ItemViewCtrl'
  }).
  when('/view/order', {
    templateUrl: 'partials/order-view.html',
    controller: 'OrderViewCtrl'
  }).
  when('/view/order/template', {
    templateUrl: 'partials/order-template.html',
    controller: 'OrderTemplateCtrl'
  }).
  when('/view/order/ticket/:orderId', {
    templateUrl: 'partials/order-ticket.html',
    controller: 'OrderTicketCtrl'
  }).
  when('/view/customer/detail/:customerId', {
    templateUrl: 'partials/customer-detail.html',
    controller: 'CustomerDetailCtrl'
  }).
  otherwise('/login');

});//End app.config
