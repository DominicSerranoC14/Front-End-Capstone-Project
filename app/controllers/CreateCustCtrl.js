"use strict";

app.controller('CreateCustCtrl', function($scope, $mdDialog) {

  //Hides create customer dialog that is called from the view cust module
  $scope.hideCreateCustomer = function() {
    $mdDialog.hide();
  };

  $scope.createCustomer = function() {
    console.log('Created');
    $mdDialog.hide();
  };

});//End createCustCtrl
