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


  ///////////////////////////////////////////////////////////
  //All partnumbers are searched here an the partnumbers segment information comes back
  let getPartNumberItem = function(itemSegment) {

    let partList = [];

    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/segment.json?orderBy="segmentKey"&equalTo="${itemSegment}"`)
      .success(function(searchObject) {
        if (searchObject) {
          Object.keys(searchObject).forEach(function(key) {
            searchObject[key].searchId = key;
            partList.push(searchObject[key]);
          });
        }
        resolve(partList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };//End getSearchPartNumbers function
  ///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////
  //All partnumbers are searched here an the partnumbers segment information comes back
  let getAssociatedItem = function(itemSegment) {

    let partList = [];

    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/item.json?orderBy="itemKey"&equalTo="${itemSegment}"`)
      .success(function(searchObject) {
        if (searchObject) {
          Object.keys(searchObject).forEach(function(key) {
            searchObject[key].searchId = key;
            partList.push(searchObject[key]);
          });
        }
        resolve(partList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };//End getSearchPartNumbers function
  ///////////////////////////////////////////////////////////


  //to set up a listener for a specific item use sdk listener
  //$rootScope.$broadcast

  return { getSearchPartNumbers, getPartNumberItem, getAssociatedItem };

});//End ItemSearchFactory
