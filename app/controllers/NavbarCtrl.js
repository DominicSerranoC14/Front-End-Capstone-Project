'use strict';

//Controller for the Navbar partial, will be ng-included in Index
app.controller('NavbarCtrl', function($scope) {

  const dropdownButton = document.getElementById('dropdown-button');
  $(dropdownButton).dropdown();

  $scope.message = 'Hello';


  //On page load display current user once Auth is working


});//End NavbarCtrl
