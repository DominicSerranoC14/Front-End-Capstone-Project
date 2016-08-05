"use strict";

//Controller for the order-view partial
app.controller('ItemViewCtrl', function($scope, ItemSearchFactory) {

  $scope.segList = [];
  $scope.entireItem = [];
  let baseItemObject = {
    itemList : [],
    desc : ""
  };

  // $scope.orderObjects = function() {
  //   console.log("Test $scope.segList", $scope.segList);
  //   $scope.segList.sort(function( a, b ) {
  //     if (a[0].order > b[0].order) {
  //       return 1;
  //     }
  //     if (a[0].order < b[0].order) {
  //       return -1;
  //     }
  //     // a must be equal to b
  //     return 0;
  //   });
  // };


  //Get each segment object from the selected partnumber
  let partNumber = ["BMP-121048-06096", "BMP-121048-09096", "BMP-121048-12096", "BMP-121048-060120", "BMP-121048-12120"];

  function loadAll() {
  angular.forEach(partNumber, function(part) {
  baseItemObject.itemNumber = part;
  let seg = part.split('-');

    angular.forEach(seg, function(each) {
      console.log("Test each", each);
      //Gets all associated seg objects from the selected partnumber
      ItemSearchFactory.getPartNumberItem(each)
      .then(function(item) {
        $scope.segList.push(item);
        //sort segList after pushing each item
        // $scope.orderObjects();
        // baseItemObject.desc += item[0].desc;
      });
    });//End of forEach

    angular.forEach(seg, function(each) {
      //Gets all associated items from the selected partnumber
      ItemSearchFactory.getAssociatedItem(each)
      .then(function(collection) {
        baseItemObject.itemList.push(collection);
      });
    });//End forEach loop
  });//End forEach partNumber
  $scope.entireItem.push(baseItemObject);
  }loadAll();



  ////////////////////////////////////////////////////
  //Section for showing and hiding item lists
  $scope.itemView = false;

  $scope.showItemList = function() {
    $scope.itemView = !$scope.itemView;
  };
  ////////////////////////////////////////////////////


});//End ItemViewCtrl
