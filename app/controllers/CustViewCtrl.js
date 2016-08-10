"use strict";

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('CustViewCtrl', function($scope, $rootScope, $location, $mdDialog, $mdToast, AuthFactory, CustomerFactory) {


  ///////////////////////////////////////////////
  $rootScope.customerList = {};
  $rootScope.customerList.customers = [];

  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';

  ///////////////////////////////////////////////
  //Start create new customer functionality
  $scope.newCustomer = {
    name : "",
    company : "",
    email : "",
    phone : "",
  };
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////


  //////////////////////////////////////////////////
  //Shows user related customers on page load
  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {
    $rootScope.customerList.customers = customerCollection;
  });// End CustomerFactory function
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////


  ///////////////////////////////////////////////
  //Javascript for prerendered dialog for adding a customer
  $scope.showCreateCustomer = function() {
    $mdDialog.show({
      templateUrl: 'partials/create-customer-dialog.html'
    });
  };

  //Hides create customer dialog that is called from the view cust module
  $scope.hideCreateCustomer = function() {
    $mdDialog.hide();
  };
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////


  ///////////////////////////////////////////////
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
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////
  // Function that deletes customer from DB and page
  $scope.deleteCustomer = function(customerId, customerName, customerCompany) {

    CustomerFactory.deleteCustomer(customerId)
    .then(function() {

      CustomerFactory.getCustomer(AuthFactory.getUser())
      .then(function(customerCollection) {
        $rootScope.customerList.customers = customerCollection;
      });// End CustomerFactory function

    });

    $scope.showSimpleToast(customerName, customerCompany);

  };//Delete Customer function
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////



  ////////////////////////////////////////////////
  //This toast is used for login message for the user
  $scope.showSimpleToast = function(customerName, customerCompany) {
    $mdToast.show(
      $mdToast.simple()
        .textContent( customerName + ' from ' + customerCompany + ' was deleted.')
        .position("right")
        .hideDelay(3000)
    );
  };
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////



});//end CustViewCtrl
