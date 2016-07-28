'use strict';

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('HomeViewCtrl', function($scope) {

  // Javascript that loads on page load for the collapsible accordion tabs
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
  });


  //Code for toolbar on home-view.html to open and scale
  $scope.speedDial = {};
  $scope.speedDial.isOpen = false;
  $scope.speedDial.mode = 'md-scale';


  $scope.message = 'Hello';

});//End HomeViewCtrl
