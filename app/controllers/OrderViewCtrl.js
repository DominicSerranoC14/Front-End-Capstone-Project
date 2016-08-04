"use strict";

//Controller for the order-view partial
app.controller('OrderViewCtrl', function($scope, $location, $mdDialog, AuthFactory, OrderFactory) {


  OrderFactory.getCustomerOrder()
  .then(function(customerCollection) {

  $scope.customerOrderList = customerCollection;

  
    // Move this function to another view when the order is selected
    // OrderFactory.getOrderItem(order.orderId)
    // .then(function(itemCollection) {
    //   console.log("Test itemCollection", itemCollection);
    // });

  });




});//End of OrderViewCtrl
