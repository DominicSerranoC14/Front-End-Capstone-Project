"use strict";

//Controller for the order-view partial
app.controller('OrderTemplateCtrl', function($scope, $location, $mdDialog, CustomerFactory, AuthFactory, OrderFactory, ItemSearchFactory) {


  //Store the current customers ID for FB here
  $scope.currentCustomer = null;


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
  // Disable save and cancel buttons on new order until the user has entered something into the inputs
  $scope.buttonView = function() {


  };//End buttonView function

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////


  //////////////////////////////////////////////////
  //Begin new item order building

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


  //Show autocomplete and filter user input with searchList of part numbers
  $('#user-item-input').keyup(function() {

    //Show auto modal here
    $('#autocomplete-container').removeClass('hide');

    //Set search text to the user input
    $scope.autocompleteSearch = $scope.newItem.itemNumber.toUpperCase();

    //If input is blank hide modal
    if ( $scope.autocompleteSearch === "" ) {
      $('#autocomplete-container').addClass('hide');
    }

    // console.log("Test $scope.autocompleteSearch", $scope.autocompleteSearch.charAt(0));
  });

  $scope.showList = true;


  //Function that selects the autocompleted text to the input value
  $scope.selectItem = function(item) {
    $scope.newItem.itemNumber = item;
    $('#autocomplete-container').addClass('hide');
  };
  //////////////////////////////////////////////


  //Display the new item to the page and push each added item to an array in the newOrderObj
  $scope.addItem = function() {

    //Test if the user inputs a valid part number by filtering the local list of partnumbers.
    let validateItem = $scope.searchList.filter(function(partNumber) {
      return $scope.newItem.itemNumber.toUpperCase() === partNumber;
    });

    //If there are no matches, the array is empty with a length of '0', and a error is shown to the user
    if ( validateItem.length === 0 ) {
      //insert dialog here, then suggest search?
      window.alert('Please enter valid partnumber.');
    } else {
      $scope.newOrderItemList.push($scope.newItem);

      $scope.newItem = {
        itemNumber: "",
        itemQuantity: 0,
      };
    }

  };//End addItem function


  //Function that sends the new object to the DB
  $scope.submitOrder = function() {

    //Set new order with the customer's customerID
    $scope.newOrderObj.customerId = $scope.currentCustomer.id;
    $scope.newOrderObj.customerName = $scope.currentCustomer.name;
    $scope.newOrderObj.customerCompany = $scope.currentCustomer.company;
    $scope.newOrderObj.date = new Date();
    $scope.newOrderObj.salesNumber = Math.floor(Math.random() * (20000 - 10000) + 10000);


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
