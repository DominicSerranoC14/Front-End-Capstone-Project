'use strict';

//Controller for the Navbar partial, will be ng-included in Index
app.controller('NavbarCtrl', function($scope, $location, $mdDialog) {


  //jQuery that activates drop down nav bar feature on page load
  $(document).ready(function() {
    $('#dropdown-button').dropdown();
  });


  //////////////
  // Angular for the dialog box confirming page leave on logout button press
  // $mdDialog must be injected
  /////////////
  $scope.showConfirm = function(eventDiv) {
    // Shows the contents of the dialog
    let confirm = $mdDialog.confirm()
          .title('Are you sure you want to leave this page?')
          .targetEvent(eventDiv)
          .ok('Leave Page')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      //Insert log out function here
      //Also redirects to login page
      $mdDialog.confirm().
        ok(console.log('works'),
        $location.url("/login"));
      });
  };


  $scope.message = 'Hello';


  //On page load display current user once Auth is working


});//End NavbarCtrl
