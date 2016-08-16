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

  $scope.customerShortcut = [];
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////


  ////////////////////////////////////////////////////
  // Populate current users customers in Customer Shortcut tab
  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {

    //Show only customers with favorited value of false, which equates to being true
    $scope.customerShortcut = customerCollection.filter(function(each) {
      return each.favorite === false;
    });

    //On each view load test if the customerShortcut array is empty, if so, advise user to create a customer
    $scope.customerFavoriteNullMessage = true;

    if ( $scope.customerShortcut.length === 0 ) {
      $scope.customerFavoriteNullMessage = false;
    }
  });// End function
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Populate urgent orders here
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Populate item graphs here
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////




});//End HomeViewCtrl
