'use strict';

//Controller for the Navbar partial, will be ng-included in Index
app.controller('NavbarCtrl', function($scope) {


  //jQuery that activates drop down nav bar feature on page load
  $(document).ready(function() {
    $('#dropdown-button').dropdown();
  });

  $scope.message = 'Hello';


  //On page load display current user once Auth is working


});//End NavbarCtrl
