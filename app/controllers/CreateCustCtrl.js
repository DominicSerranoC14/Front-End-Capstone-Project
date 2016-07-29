"use strict";

app.controller('CreateCustCtrl', function($scope, $mdDialog, $location, AuthFactory, CustomerFactory) {

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
    CustomerFactory.addCustomer($scope.newCustomer);

    CustomerFactory.getCustomer(AuthFactory.getUser())
    .then(function(customerCollection) {
      $location.url('view/customer');
      $scope.customerList = customerCollection;
    });

    $mdDialog.hide();
  };


});//End createCustCtrl
