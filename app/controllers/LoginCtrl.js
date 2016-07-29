"use strict";

app.controller("LoginCtrl", function( $scope, $location, AuthFactory ) {

    // register function

  $scope.login = function() {
    AuthFactory.authWithProvider()
   .then(function(result) {
     var user = result.user.uid;
     console.log("logged in user fer sure", user);
     $location.path("/home");
     $scope.$apply();
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


});
