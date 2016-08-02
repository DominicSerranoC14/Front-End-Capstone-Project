"use strict";

//Controller for the order-ticket view
app.controller('OrderTicketCtrl', function( $scope, $routeParams, OrderFactory ) {

  //Prints order object on view
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


  //Function that deletes each order and related items from FB
  $scope.deleteOrder = function() {

    OrderFactory.deleteOrder($routeParams.orderId)
    .then(function(returnObj) {

    });

    angular.forEach($scope.itemList , function(each) {
      OrderFactory.deleteOrderItemList(each.itemId)
      .then(function(returnObj) {
        console.log("Test items have been deleted");
      });
    });//End forEach loop


  };//End deleteOrder function




});
