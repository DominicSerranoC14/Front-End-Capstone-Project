"use strict";

app.factory('CustomerFactory', function($q, $http, FirebaseURL) {

  let getCustomer = function(userId) {

    let customers = [];

    //$q is angular's version of 'new Promise'
    return $q(function(resolve, reject) {

      $http.get(`${FirebaseURL}/customer.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(customerObject) {
        if (customerObject) {
          Object.keys(customerObject).forEach(function(key) {
            customerObject[key].id = key;
            customers.push(customerObject[key]);
          });
        }
        resolve(customers);
      })
      .error(function(error){
        reject(error);
      });
    });
  };


  ////////////////////////////////////////////////////////
  // Adds new customer to DB from add customer form
  let addCustomer = function(newCustomer) {

    //$q is angular's version of 'new Promise'
    return $q(function(resolve, reject) {

      $http.post(`${FirebaseURL}/customer.json`,
      JSON.stringify(newCustomer))
      .success(function(newCustObject) {
        resolve(newCustObject);
      }).error( function(error){
        reject(error);
      });
    });
  };
  ////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////
  // Deletes customer to DB from view/customer/
  let deleteCustomer = function (customerId) {
    return $q(function(resolve, reject) {
      $http.delete(
        `${FirebaseURL}/customer/${customerId}.json`
      )
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };
  //////////////////////////////////////////////////////


  //////////////////////////////////////////////////////
  // Edits a currentely existing customer
  let editCustomer = function(customerId, customerObj) {
   return $q(function(resolve, reject) {
     $http.patch(
       `${FirebaseURL}/customer/${customerId}.json`,
         JSON.stringify(customerObj)
     )
     .success(function(message) {
       resolve(message);
     })
     .error(function(error) {
       reject(error);
     });
   });
  };
  //////////////////////////////////////////////////////


  //Export functions to controller's here
  return { addCustomer , getCustomer, deleteCustomer, editCustomer };
});
