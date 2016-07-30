'use strict';

app.controller('CustomerDetailCtrl', function($scope, $mdDialog, $routeParams, CustomerFactory, AuthFactory) {

  //In this view, the customer selected will be displayed by filtering through the users customers and returning the matching customer id
  $scope.customer = [];


  let populateSelectedCustomer = function() {
    CustomerFactory.getCustomer(AuthFactory.getUser())
    .then(function(customerCollection) {
      $scope.customerList = customerCollection;

      //Filter that loops through the users returned customers and returns the selected customer in a seperate view
      $scope.selectedCustomer = $scope.customerList.filter(function(cust) {
        return cust.id === $routeParams.customerId;
      })[0];
    });
  }; populateSelectedCustomer();

  /////////////////////////////////
  //Javascript for showing hidden dialogs
  // Editing customer information functionality listed here


  //Function that patches the edited obj to DB
  $scope.saveEditCustomer = function() {

    CustomerFactory.editCustomer($routeParams.customerId, $scope.editCustomerObj)
    .then(function() {

      $mdDialog.hide();

      populateSelectedCustomer();

    });

  };//End function


  //Function to show for prerendered dialog for editing a customer
  $scope.showEditCustomer = function() {

    $scope.editCustomerObj = {
      name : $scope.selectedCustomer.name,
      company : $scope.selectedCustomer.company,
      email : $scope.selectedCustomer.email,
      phone : $scope.selectedCustomer.phone,
    };

    $mdDialog.show({
      contentElement: document.querySelector('#edit-customer')
    });
  };//End function

  //Hides edit customer dialog on press of 'x'
  $scope.hideEditCustomer = function() {
    $mdDialog.hide();
  };//End function


  ////////////////////////////////
  ///////////////////////////////

});//End of CustomerDetailCtrl
