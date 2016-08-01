"use strict";

//Controller for the order-view partial
app.controller('OrderTemplateCtrl', function($scope, $location, $mdDialog, CustomerFactory, AuthFactory) {


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
      return $scope.selectedItem.name;
    } else {
      return "  Please select a customer  ";
    }
    };

  });//End view load of customers
  ///////////////////////////////////////////////////


  $scope.newItem = {
    itemNumber: "",
    itemQuantity: 0
  };

  $scope.newOrderObj = {

  };

  $scope.newOrderObj.itemList = [];

  $scope.addItem = function() {

    // $scope.newItem.itemNumber = "";
    // $scope.newItem.itemQuantity = 0;

    let addedItem = $scope.newItem;
    $scope.newOrderObj.itemList.push(addedItem);

  };


});//End of OrderViewCtrl
