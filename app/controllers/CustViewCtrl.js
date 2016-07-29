"use strict";

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('CustViewCtrl', function($scope, $mdDialog) {

  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';


  //Javascript for prerendered dialog for adding a customer
  $scope.showCreateCustomer = function() {
    $mdDialog.show({
      templateUrl: 'partials/create-customer-dialog.html'
    });
  };


});//end CustViewCtrl
