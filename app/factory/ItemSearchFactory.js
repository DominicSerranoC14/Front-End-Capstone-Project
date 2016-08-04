"use strict";

app.factory('ItemSearchFactory', function($q, $http, FirebaseURL) {


  ///////////////////////////////////////////////////////////
  //All Item-search predefined partnumbers are requested here
  let getSearchPartNumbers = function() {

    let searchList = [];

    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/part-search.json`)
      .success(function(searchObject) {
        if (searchObject) {
          Object.keys(searchObject).forEach(function(key) {
            searchObject[key].searchId = key;
            searchList.push(searchObject[key]);
          });
        }
        resolve(searchList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };//End getSearchPartNumbers function
  ///////////////////////////////////////////////////////////


  //to set up a listener for a specific item use sdk listener
  //$rootScope.$broadcast

  return { getSearchPartNumbers };

});//End ItemSearchFactory
