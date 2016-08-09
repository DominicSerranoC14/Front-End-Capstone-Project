"use strict";

//Controller for the order-view partial
app.controller('ItemViewCtrl', function($scope, ItemSearchFactory) {


///////////////////////////////////////////////////////
//Item object where the segent descriptions are build up and stored, as well as each associated item
let baseItemObject = {
  itemList : [],
  desc : ""
};
//Function that clears out the arrays and objects used for an item list search
let clearItemSearch = function() {
  //Array that stores the users item number as 3 segments
  $scope.segList = [];
  //Array that stores the whole object to be repeated over
  $scope.entireItem = [];
  baseItemObject = {
    itemList : [],
    desc : ""
  };

  //Closes the item list view on a new search
  $scope.itemView = false;
};//end clearItemSearch

  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////


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
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Function that returns either the selected text or a message that tells the user to select an item
  $scope.selectedItem = "";
  $scope.getSelectedText = function() {
  if ($scope.selectedItem !== "") {
    $scope.currentPartNumber = $scope.selectedItem;
    return $scope.selectedItem;
  } else {
    return "  Please select a partnumber  ";
  }
  };
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Function which take the three segment objects and sorts them by order
  //To correctly build the description sentence
  $scope.orderObjects = function() {
    console.log("Test $scope.segList", $scope.segList);
    $scope.segList.sort(function( a, b ) {
      if (a[0].order > b[0].order) {
        return 1;
      }
      if (a[0].order < b[0].order) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  };//End orderObjects function
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  $scope.loadAll = function() {
    clearItemSearch();
    //Set the selected user input to scope var here
    //Convert it to lower case for FB search
    let partNumber = $scope.selectedItem.toLowerCase();

    //Stamp the current user input partnumber to the item chosen
    baseItemObject.itemNumber = partNumber.toUpperCase();
    //Split the part number for searching
    let seg = partNumber.split('-');

    angular.forEach(seg, function(each) {
      //Gets all associated seg objects from the selected partnumber
      ItemSearchFactory.getPartNumberItem(each)
      .then(function(item) {
        $scope.segList.push(item);
        //sort segList after pushing each item
        $scope.orderObjects();
        baseItemObject.desc += item[0].desc;
      });
    });//End of forEach

    angular.forEach(seg, function(each) {
      //Gets all associated items from the selected partnumber
      ItemSearchFactory.getAssociatedItem(each)
      .then(function(collection) {
        baseItemObject.itemList.push(collection);
      });
    });//End forEach loop

    $scope.entireItem.push(baseItemObject);
  };//End loadAll



  ////////////////////////////////////////////////////
  //Section for showing and hiding item lists with list icon
  $scope.itemView = false;

  $scope.showItemList = function() {
    $scope.itemView = !$scope.itemView;
  };
  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////


});//End ItemViewCtrl
