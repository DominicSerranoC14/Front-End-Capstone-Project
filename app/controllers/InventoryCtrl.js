"use strict";

app.controller('InventoryCtrl', function($scope, InventoryFactory) {

  /////////////////////////////////////////////////////////////
  //Variables and presets for graphs
  $scope.filterList = [];
  $scope.series = ['Sold qty: ', 'In stock: '];
  $scope.labels = [];
  $scope.data = [];
  $scope.pageMessage = "Please select a graph view.";
  $scope.colors = [ '#00ADF9', '#FDB45C'];
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////
  //Store each inventory item obj in a local array
  InventoryFactory.getInventoryItemList()
  .then(function(list) {

    //Push each item object to an array to be sorted for custom data
    angular.forEach(list, function(each) {
      $scope.filterList.push(each);
    });

  });
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////
  // Functionality for changing graph view
  $scope.barGraphView = function() {
    $scope.viewBarGraph = false;
    $scope.viewRadarGraph = true;
    $scope.viewHorizontalGraph = true;
  };

  $scope.radarGraphView = function() {
    $scope.viewRadarGraph = false;
    $scope.viewBarGraph = true;
    $scope.viewHorizontalGraph = true;
  };

  $scope.horizontalGraphView = function() {
    $scope.viewHorizontalGraph = false;
    $scope.viewBarGraph = true;
    $scope.viewRadarGraph = true;
  };
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////


  /////////////////////////////////////////////////////////////
  //Event Listener for graph view icons, once clicked the view graph buttons are disabled
  $('.graph-icons').click(function() {
    document.getElementById('top5Button').removeAttribute('disabled');
    document.getElementById('top10Button').removeAttribute('disabled');
    document.getElementById('top25Button').removeAttribute('disabled');
  });
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////
  //Bar graph functionality
  //Function populates the bar graph with the top 5 items based on sales
  $scope.listTop5 = function() {
    //Reset the graph arrays
    $scope.labels = [];
    $scope.data = [];
    $scope.pageMessage = 'Top 5 selling items.';

    //Stores the first five of the inventory array
    let list = $scope.filterList.slice(0,5);
    let stockArray = [];
    let soldArray = [];
    //Push each partnumber to the labels array
    angular.forEach(list, function(each) {
      $scope.labels.push(each.name);
      //Push each part quantity to an array
      stockArray.push(each.stock);
      soldArray.push(each.quantity);
    });
    //Push the array of quantities to data
    $scope.data.push(soldArray);
    $scope.data.push(stockArray);
  };


  //Function populates the bar graph with the top 10 items based on sales
  $scope.listTop10 = function() {
    //Reset the graph arrays
    $scope.labels = [];
    $scope.data = [];
    $scope.pageMessage = 'Top 10 selling items.';

    //Stores the first ten of the inventory array
    let list = $scope.filterList.slice(0,10);
    let stockArray = [];
    let soldArray = [];
    //Push each partnumber to the labels array
    angular.forEach(list, function(each) {
      $scope.labels.push(each.name);
      //Push each part quantity to an array
      stockArray.push(each.stock);
      soldArray.push(each.quantity);
    });
    //Push the array of quantities to data
    $scope.data.push(soldArray);
    $scope.data.push(stockArray);
  };

  //Function populates the bar graph with the top 25 items based on sales
  $scope.listTop25 = function() {

    $scope.labels = [];
    $scope.data = [];
    $scope.pageMessage = 'Top 25 selling items.';

    let stockArray = [];
    let soldArray = [];

    angular.forEach($scope.filterList, function(each) {
      $scope.labels.push(each.name);
      //Push each part quantity to an array
      stockArray.push(each.stock);
      soldArray.push(each.quantity);
    });
    //Push the array of quantities to data
    $scope.data.push(soldArray);
    $scope.data.push(stockArray);

  };
  //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////


});//End InventoryCtrl
