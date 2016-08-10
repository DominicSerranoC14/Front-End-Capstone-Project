"use strict";

app.controller("LoginCtrl", function( $scope, $location, $mdToast, AuthFactory ) {

    // register function

  $scope.login = function() {
    AuthFactory.authWithProvider()
   .then(function(result) {
     let user = result.user.uid;
     console.log("logged in user fer sure", user);
     $location.path("/home");
     $scope.$apply();
     $scope.showSimpleToast();
   }).catch(function(error) {
     // Handle Errors here.
     let errorCode = error.code;
     let errorMessage = error.message;
     // The email of the user's account used.
     let email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     let credential = error.credential;
     // ...
   });
  };


  ////////////////////////////////////////////////
  //This toast is used for login message for the user
  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Welcome ' + AuthFactory.getUserName()[0] + '!')
        .position("right")
        .hideDelay(3000)
    );
  };
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////


});
