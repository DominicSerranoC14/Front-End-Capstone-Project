"use strict";

app.factory('OrderFactory', function($q, $http, FirebaseURL) {

  //////////////////////////////////////////////////////
  //All adding order/item functionality goes here
  //Function that posts orderId's and customer ids to FB
  let addOrder = function(newOrder) {

    return $q(function(resolve, reject) {

      $http.post(`${FirebaseURL}/order.json`,
      // JSON.stringify(newOrder)
      newOrder
    )
      .success(function(orderId) {
        resolve(orderId);
      }).error( function(error){
        reject(error);
      });
    });
  };

  let addItemToOrder = function(newItem) {

    return $q(function(resolve, reject) {

      $http.post(`${FirebaseURL}/order-item.json`,
      // JSON.stringify(newOrder)
      newItem
    )
      .success(function(itemId) {
        resolve(itemId);
      }).error( function(error){
        reject(error);
      });
    });
  };
  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  // All getting order/item functionality goes here

  //Loads all orders to order view partial
  let getCustomerOrder = function() {

    let orderList = [];

    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/order.json`)
      .success(function(orderObject) {
        if (orderObject) {
          Object.keys(orderObject).forEach(function(key) {
            orderObject[key].orderId = key;
            orderList.push(orderObject[key]);
          });
        }
        resolve(orderList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };


  //Loads specific order to view order ticket partial
  let getCustomerOrderTicket = function(orderId) {

    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/order/${orderId}.json`)
      .success(function(orderObject) {
        resolve(orderObject);
      })
      .error(function(error){
        reject(error);
      });
    });
  };


  //Grabs each item that is on each order by searching for orderKey
  let getOrderItem = function(orderId) {

    let itemList = [];

    //$q is angular's version of 'new Promise'
    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/order-item.json?orderBy="orderKey"&equalTo="${orderId}"`)
      .success(function(itemObject) {
        if (itemObject) {
          Object.keys(itemObject).forEach(function(key) {
            itemObject[key].itemId = key;
            itemList.push(itemObject[key]);
          });
        }
        resolve(itemList);
      })
      .error(function(error){
        reject(error);
      });
    });
  };


  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  //All order deleting functionality goes here
  let deleteOrder = function (orderId) {

    return $q(function(resolve, reject) {
      $http.delete(
        `${FirebaseURL}/order/${orderId}.json`
      )
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  //Deletes the items associated with the order number
  let deleteOrderItemList = function (itemId) {

    return $q(function(resolve, reject) {
      $http.delete(
        `${FirebaseURL}/order-item/${itemId}.json`
      )
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };
  ///////////////////////////////////////////////////


  //Export functions here
  return { addOrder, addItemToOrder, getCustomerOrder, getOrderItem, getCustomerOrderTicket, deleteOrder, deleteOrderItemList };


});//End of OrderFactory
