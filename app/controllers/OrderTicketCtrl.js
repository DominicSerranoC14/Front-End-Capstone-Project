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


  ////////////////////////////////////////////////////
  //Get predefined partnumbers localy and push to an array
  ItemSearchFactory.getSearchPartNumbers()
  .then(function(searchObject) {

    $scope.searchList = [];

    angular.forEach(searchObject, function(item) {
      $scope.searchList.push(item.partnumber);
    });
  });
  ///////////////////////////////////////////////////


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
  ///////////////////////////////////////////////////////////


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

    //When user keyups on input, the partnumber must be validated before updating the order
    $('#item-number-input').keyup(function() {
      $('#item-validate-btn').removeClass('disabled');
    });
  };

  //Shows the original order ticket in display view
  //Also hides the save button and show edit
  $scope.displayView = function() {
    $scope.displayMode = true;

    $('#edit-button').removeClass('hide');
    $('#save-button').addClass('hide');
  };//End displayView function


  //Checks each edited item to insure it is an existing partnumber
  $scope.validateItem = function(itemNumber) {

    //Test if the user inputs a valid part number by filtering the local list of partnumbers.
    let validateItem = $scope.searchList.filter(function(partNumber) {
      return itemNumber === partNumber;
    });

    //If there are no matches, the array is empty with a length of '0', and a error is shown to the user
    if ( validateItem.length === 0 ) {
      //insert dialog here, then suggest search?
      window.alert('Please enter valid partnumber.');
    } else {
      $('#item-validate-btn').addClass('disabled');
      $('#save-button').removeClass('disabled');
    }
  };//End validateItem function


  //Once update button press, the existing items are updated and views are switched out
  $scope.updateOrder = function() {

  //Loops through each item obj ass. to order and edits existing objects in FB
  angular.forEach($scope.itemList, function(item) {
    OrderFactory.editItemList(item.itemId, item)
    .then(function(returnObj) {
      $scope.displayView();
    });
  });

  };//End updateOrder function
  ////////////////////////////////////////////////////


});
