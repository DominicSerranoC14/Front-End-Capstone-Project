'use strict';

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('HomeViewCtrl', function($scope) {

  //Java script that loads on page load for the collapsible accordion tabs
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false
    });
  });


  $scope.message = 'Hello';

});//End HomeViewCtrl
