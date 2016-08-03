"use strict";

//Controller for the order-ticket view
app.controller('OrderTicketCtrl', function( $scope, $location, $routeParams, OrderFactory, ItemSearchFactory ) {

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


  ////////////////////////////////////////////////////////////
  // All functionality for editing an order's item goes here
  //The displayMode will default to the order ticket where items are displayed only
  $scope.displayMode = true;

  //Shows each item in a line list edit view
  //Also hides the edit button and shows the save button
  $scope.editView = function() {
    $scope.displayMode = !$scope.displayMode;

    $('#edit-button').addClass('hide');
    $('#save-button').removeClass('hide');
  };

  //Shows the original order ticket in display view
  //Also hides the save button and show edit
  $scope.displayView = function() {
    $scope.displayMode = true;

    $('#edit-button').removeClass('hide');
    $('#save-button').addClass('hide');
  };//End displayView function

  //One update button press, the existing items are updated and views are switched out
  $scope.updateOrder = function() {
    $scope.displayView();
    //Loops through each item obj ass. to order and edits existing objects in FB
    angular.forEach($scope.itemList , function(each) {
      OrderFactory.editItemList(each.itemId, each)
      .then(function(returnObj) {});
    });//End forEach loop
  };//End updateOrder function


  ////////////////////////////////////////////////////////////




});
