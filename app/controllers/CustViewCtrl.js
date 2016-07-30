"use strict";

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('CustViewCtrl', function($scope, $rootScope, $location, $mdDialog, AuthFactory, CustomerFactory) {


  $rootScope.customerList = {};
  $rootScope.customerList.customers = [];


  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';


  //Javascript for prerendered dialog for adding a customer
  $scope.showCreateCustomer = function() {
    $mdDialog.show({
      templateUrl: 'partials/create-customer-dialog.html'
    });
  };


  ///////////////////////////////////////////////
  // Function that deletes customer from DB and page
  $scope.deleteCustomer = function(customerId) {

    CustomerFactory.deleteCustomer(customerId)
    .then(function() {

      CustomerFactory.getCustomer(AuthFactory.getUser())
      .then(function(customerCollection) {
        $rootScope.customerList.customers = customerCollection;
      });// End CustomerFactory function

    });

  };//Delete Customer function


  //Shows user related customers on page load
  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {
    $rootScope.customerList.customers = customerCollection;
  });// End CustomerFactory function
  ////////////////////////////////////////////////


  ///////////////////////////////////////////////
  //Start create new customer functionality
  $scope.newCustomer = {
    name : "",
    company : "",
    email : "",
    phone : ""
  };


  //Hides create customer dialog that is called from the view cust module
  $scope.hideCreateCustomer = function() {
    $mdDialog.hide();
  };


  //Functionality for create customer button
  $scope.createCustomer = function() {
    //Set uid of current user
    $scope.newCustomer.uid = AuthFactory.getUser();
    //put customer to DB
    CustomerFactory.addCustomer($scope.newCustomer)
    .then(function() {
      CustomerFactory.getCustomer(AuthFactory.getUser())
      .then(function(customerCollection) {
        $rootScope.customerList.customers = customerCollection;
      });
    });

    $mdDialog.hide();
  };
  ///////////////////////////////////////////////////



});//end CustViewCtrl
