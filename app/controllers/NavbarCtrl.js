'use strict';

//Controller for the Navbar partial, will be ng-included in Index
app.controller('NavbarCtrl', function($scope, $location, $mdDialog, $mdToast, AuthFactory) {


  //////////////////////////////////////////////////////////////////////
  //jQuery that activates drop down nav bar feature on page load
  $(document).ready(function() {
    $('#dropdown-button').dropdown();
  });
  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////
  // Angular for the dialog box confirming page leave on logout button press
  // $mdDialog must be injected
  $scope.showConfirm = function(eventDiv) {
    // Shows the contents of the dialog
    let confirm = $mdDialog.confirm()
          .title('Are you sure you want to sign out?')
          .targetEvent(eventDiv)
          .ok('Sign Out')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      $mdDialog.confirm().
      //Redirect to login page
        ok($location.url("/login"));
        //Logs out the current user
        AuthFactory.signOut();
        $scope.showSimpleToast();
      });
  };
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////


  ////////////////////////////////////////////////
  //This toast is used for log out message for the user
  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Thanks for visiting ' + AuthFactory.getUserName()[0] + '!')
        .position("right")
        .hideDelay(3000)
    );
  };
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////



});//End NavbarCtrl
