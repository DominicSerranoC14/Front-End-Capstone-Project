"use strict";

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('CustViewCtrl', function($scope, $rootScope, $location, $mdDialog, $mdToast, AuthFactory, CustomerFactory, OrderFactory) {


  ///////////////////////////////////////////////
  //Main object and array to display each customer to view
  $rootScope.customerList = {};
  $rootScope.customerList.customers = [];

  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////


  ///////////////////////////////////////////////
  //Start create new customer functionality
  $scope.newCustomer = {
    name : "",
    company : "",
    email : "",
    phone : "",
    //Sets the new customer to not favorited by default
    favorite: true
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


  ///////////////////////////////////////////////////////////////////////
  // Angular for the dialog box confirming page leave on logout button press
  // $mdDialog must be injected
  $scope.showConfirmDeleteCustomer = function(eventDiv, customerNum, customerName, customerCompany) {
    // Shows the contents of the dialog
    let confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete ' + customerName + '?')
          .textContent('Deleting this customer will also delete all information associated, including all orders.')
          .targetEvent(eventDiv)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      $mdDialog.confirm().
      //Redirect to login page
        ok($location.url("/view/customer"));
        //Deletes current customer and all order info
        $scope.deleteCustomer(customerNum, customerName, customerCompany);
      });
  };
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////



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
  $scope.deleteCustomer = function(customerNum, customerName, customerCompany) {

    //Delete customer from DB
    CustomerFactory.deleteCustomer(customerNum)
    .then(function() {

      //Repopulate the view after deleting selected customer
      CustomerFactory.getCustomer(AuthFactory.getUser())
      .then(function(customerCollection) {
        $rootScope.customerList.customers = customerCollection;
      });// End CustomerFactory function

    });

    //Begin deleting all orders and all order-items associated with the customer
    let customerOrderDeleteList = [];
    //Filter through customers and return the one selection
    OrderFactory.getCustomerOrder()
    .then(function(customerList) {
      customerOrderDeleteList = customerList.filter(function(each) {
        return each.customerId === customerNum;
      });
      //Delete each order obj. from FB associated with customer
      angular.forEach(customerOrderDeleteList, function(order) {
        OrderFactory.deleteOrder(order.orderId).then();

        //Delete each order-item obj. from FB associated with customer
        OrderFactory.getOrderItem(order.orderId)
        .then(function(orderItemList) {
          angular.forEach(orderItemList, function(orderItem) {
            OrderFactory.deleteOrderItemList(orderItem.itemId).then();
          });
        });
      });
    });

    $scope.showSimpleToast(customerName, customerCompany);

  };//End Delete Customer function
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
