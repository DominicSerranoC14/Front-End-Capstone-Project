"use strict";

//Controller for the HomeViewCtrl partial, will be ng-included in Index
app.controller('LoginCtrl', function($scope) {

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    let confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };


  $scope.message = 'hello';

});//end LoginCtrl
