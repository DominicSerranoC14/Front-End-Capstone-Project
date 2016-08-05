"use strict";

//Controller for the order-view partial
app.controller('OrderViewCtrl', function($scope, $location, $mdDialog, AuthFactory, OrderFactory) {

  ////////////////////////////////////////////////////
  // Load all orders and display to DOM
  OrderFactory.getCustomerOrder()
  .then(function(customerCollection) {

  $scope.customerOrderList = customerCollection;
  });
  ////////////////////////////////////////////////////


  ////////////////////////////////////////////////////
  // Handle customer display change here, default is list view
  //Sets the default view to list style
  $scope.viewStyle = true;

  //Changes view to list from grid
  $scope.showList = function() {
    $scope.viewStyle = true;
  };

  //Changes view to grid from list
  $scope.showGrid = function() {
    $scope.viewStyle = false;
  };
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////

  ////////////////////////////////////////////////////
  //Search ability for customer view
  //works in grid and list views
  //Links the orders to the search bar which is ng-modeled to searchText
  $scope.searchText = $scope.customerOrderList;
  ////////////////////////////////////////////////////





});//End of OrderViewCtrl
