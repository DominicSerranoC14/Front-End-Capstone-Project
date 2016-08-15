"use strict";

app.factory('InventoryFactory', function($q, $http, FirebaseURL) {

  //////////////////////////////////////////////////
  //Begin functionality to get all inventory partnumbers
  let getInventoryItemList = function() {

    //$q is angular's version of 'new Promise'
    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/inventory-item.json`)
      .success(function(itemList) {
        resolve(itemList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

  return { getInventoryItemList };

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

});//End InventoryFactory
