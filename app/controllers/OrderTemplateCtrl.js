"use strict";

//Controller for the order-view partial
app.controller('OrderTemplateCtrl', function($scope, $location, $mdDialog, CustomerFactory, AuthFactory, OrderFactory) {


  //Store the current customers ID for FB here
  $scope.currentCustomer = null;


  //////////////////////////////////////////////////////

  //jQuery to activate the department drop down select
  $(document).ready(function() {
    $('select').material_select();
  });

  //On view load, the select menu is populated with the users associated customers
  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {
    $scope.customers = customerCollection;

    //Function that returns either the selected text or a message that tells the use to select an item
    $scope.selectedItem = "";
    $scope.getSelectedText = function() {
    if ($scope.selectedItem !== "") {
      $scope.currentCustomer = $scope.selectedItem;
      return $scope.selectedItem.company;
    } else {
      return "  Please select a customer  ";
    }
    };

  });//End view load of customers
  ///////////////////////////////////////////////////


  //////////////////////////////////////////////////
  //Begin item order building

  //New object order to be passed to fb
  $scope.newOrderObj = {};

  //Each item line will be added to this array
  $scope.newOrderItemList = [];

  //Function that resests the newItem function
  $scope.clearItemInput = function() {

    $scope.newItem = {
      itemNumber: "",
      itemQuantity: 0,
    };

  };//End clearItemInput function


  //Display the new item to the page and push each added item to an array in the newOrderObj
  $scope.addItem = function() {

    $scope.newOrderItemList.push($scope.newItem);

    $scope.newItem = {
      itemNumber: "",
      itemQuantity: 0,
    };
  };//End addItem function


  //Function that sends the new object to the DB
  $scope.submitOrder = function() {

    //Set new order with the customer's customerID
    $scope.newOrderObj.customerId = $scope.currentCustomer.id;
    $scope.newOrderObj.customerName = $scope.currentCustomer.name;
    $scope.newOrderObj.customerCompany = $scope.currentCustomer.company;
    $scope.newOrderObj.date = new Date();


    OrderFactory.addOrder($scope.newOrderObj)
    .then(function(orderId) {
      //Loop over each item in the itemList array and add the orderId to each the push to FB
      let itemList = $scope.newOrderItemList;
      angular.forEach(itemList, function(item) {

        item.orderKey = orderId.name;
        OrderFactory.addItemToOrder(item)
        .then(function() {
          $location.url('/view/order');
        });
      });//End forEach loop
    });//End Add new order obj to FB

  };//End submitOrder function
  ////////////////////////////////////////////////////

});//End of OrderViewCtrl
