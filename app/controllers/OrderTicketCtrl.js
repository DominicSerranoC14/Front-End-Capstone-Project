"use strict";

//Controller for the order-ticket view
app.controller('OrderTicketCtrl', function( $scope, $routeParams, OrderFactory ) {

  //Prints order object
  OrderFactory.getCustomerOrderTicket($routeParams.orderId)
  .then(function(orderObj) {
    console.log("Test orderObj", orderObj );

    $scope.customerOrder = orderObj;

    //prints associate items when this ticket is opened
    OrderFactory.getOrderItem($routeParams.orderId)
    .then(function(orderItemCollection) {

      $scope.itemList = orderItemCollection;

    });

  });




});
