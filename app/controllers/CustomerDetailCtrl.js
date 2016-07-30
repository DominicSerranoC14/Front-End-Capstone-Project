'use strict';

app.controller('CustomerDetailCtrl', function($scope, CustomerFactory, AuthFactory, $routeParams) {

  $scope.customer = [];

  CustomerFactory.getCustomer(AuthFactory.getUser())
  .then(function(customerCollection) {
    $scope.customerList = customerCollection;

    //Filter that loops through the users returned customers and returns the selected customer in a seperate view
    $scope.selectedCustomer = $scope.customerList.filter(function(cust) {
      return cust.id === $routeParams.customerId;
    })[0];
  });

});
