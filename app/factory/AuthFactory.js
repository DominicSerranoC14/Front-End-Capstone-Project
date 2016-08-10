"use strict";

app.factory("AuthFactory", function () {

  let currentUserId = null;
  let userName = null;
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log("User logged in", user.uid);
      currentUserId = user.uid;
      userName = user.displayName;
    } else {
      console.log("user not logged in");
    }
  });

  let authWithProvider = function () {
    return firebase.auth().signInWithPopup(provider);
  };

  let signOut = function () {
    currentUserId = null;
    return firebase.auth().signOut();
  };

  let isAuthenticated = function () {
    return (currentUserId) ? true: false;
  };

  let getUser = function() {
    return currentUserId;
  };

  //Grabs the users display name for use through out the app
  let getUserName = function() {
    let splitName = userName.split(' ');
    return splitName;
  };

  return { authWithProvider, isAuthenticated, getUser, signOut, getUserName };

});
