"use strict";

//Controller for the order-view partial
app.controller('ItemViewCtrl', function($scope, ItemSearchFactory) {

  let test = "bmp-121048-06096";
  let seg = test.split('-');
  $scope.segList = [];

  $scope.orderObjects = function() {

    $scope.segList.sort(function( a, b ) {

      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    console.log("Test segList", $scope.segList);

  };

  //Get each segment object from the selected partnumber
  angular.forEach(seg, function(each) {

    ItemSearchFactory.getPartNumberItem(each)
    .then(function(item) {

      $scope.segList.push(item);

    });

    //Gets all associated items from the selected partnumber
    ItemSearchFactory.getAssociatedItem(each)
    .then(function(collection) {
      $scope.itemList = collection;
    });

  });//End of forEach

});//End ItemViewCtrl
