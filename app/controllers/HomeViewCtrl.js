'use strict';

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('HomeViewCtrl', function($scope, CustomerFactory, AuthFactory) {

  //////////////////////////////////////////////////
  // Javascript for nav bar and fab tool bar
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
  });


  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';
  /////////////////////////////////////////////////////


  ////////////////////////////////////////////////////
  // Populate current users customers in Customer Shortcut tab
  // Add favorited customers here?

  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {

    $scope.customerShortcut = customerCollection;

  });// End function

  ///////////////////////////////////////////////////





});//End HomeViewCtrl
