"use strict";

//Controller for the order-ticket view
app.controller('OrderTicketCtrl', function( $scope, $location, $routeParams, OrderFactory ) {

  ////////////////////////////////////////////////////////
  //Prints order object on load
  OrderFactory.getCustomerOrderTicket($routeParams.orderId)
  .then(function(orderObj) {

    //Set current order to scope
    $scope.customerOrder = orderObj;

    //prints associate items when this ticket is opened
    OrderFactory.getOrderItem($routeParams.orderId)
    .then(function(orderItemCollection) {

      //Set current order items to scope
      $scope.itemList = orderItemCollection;

    });
  });//End page load function
  ////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////
  //Function that deletes each order and related items from FB
  $scope.deleteOrder = function() {

    //Deletes order object from FB
    OrderFactory.deleteOrder($routeParams.orderId)
    .then(function(returnObj) { });

    //Loops through each item obj ass. to order and deletes from FB
    angular.forEach($scope.itemList , function(each) {
      OrderFactory.deleteOrderItemList(each.itemId)
      .then(function(returnObj) {
        $location.url('/view/order');
      });
    });//End forEach loop

  };//End deleteOrder function
  ////////////////////////////////////////////////////////////


});
