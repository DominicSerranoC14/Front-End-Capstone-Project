'use strict';

app.controller('CustomerDetailCtrl', function($scope, $mdDialog, $routeParams, CustomerFactory, OrderFactory, AuthFactory) {

  //In this view, the customer selected will be displayed by filtering through the users customers and returning the matching customer id
  $scope.customer = [];

  ///////////////////////////////////////////////////
  //Prints the selected customers details
  let populateSelectedCustomer = function() {
    CustomerFactory.getCustomer(AuthFactory.getUser())
    .then(function(customerCollection) {
      $scope.customerList = customerCollection;

      //Filter that loops through the users returned customers and returns the selected customer in a seperate view
      $scope.selectedCustomer = $scope.customerList.filter(function(cust) {
        return cust.id === $routeParams.customerId;
      })[0];

      $scope.editCustomerObj = {
        name : $scope.selectedCustomer.name,
        company : $scope.selectedCustomer.company,
        email : $scope.selectedCustomer.email,
        phone : $scope.selectedCustomer.phone,
        favorite : $scope.selectedCustomer.favorite
      };

      $scope.showFavorite = $scope.editCustomerObj.favorite;

    });
  }; populateSelectedCustomer();
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Loads the current customers related orders
  let populateSelectedCustomerOrder = function() {

    OrderFactory.getCustomerOrder()
    .then(function(orderCollection) {

      $scope.selectedCustomerOrderList = orderCollection.filter(function(order) {
        return order.customerId === $routeParams.customerId;
      });
    });

  }; populateSelectedCustomerOrder();
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  ///////////////////////////////////////////////
  //All customer favoriting functionality goes hideCreateCustomer
  //Replace true with selected customer.favorite

  $scope.favoriteCustomer = function() {

    //Toggles favoriting the customer each click
    $scope.showFavorite = !$scope.editCustomerObj.favorite;
    //Then sets the edit object to the correct boolean value
    $scope.editCustomerObj.favorite = $scope.showFavorite;

    //Patch the changed favorite value each click
    CustomerFactory.editCustomer($routeParams.customerId, $scope.editCustomerObj)
    .then();

  };
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////


  ///////////////////////////////////////////////////
  //Javascript for showing hidden dialogs
  // Editing customer information functionality listed here
  //Function that patches the edited obj to DB
  $scope.saveEditCustomer = function() {

    CustomerFactory.editCustomer($routeParams.customerId, $scope.editCustomerObj)
    .then(function() {

      $mdDialog.hide();

      populateSelectedCustomer();

    });

  };//End function


  //Function to show for prerendered dialog for editing a customer
  $scope.showEditCustomer = function() {

    $scope.editCustomerObj = {
      name : $scope.selectedCustomer.name,
      company : $scope.selectedCustomer.company,
      email : $scope.selectedCustomer.email,
      phone : $scope.selectedCustomer.phone,
      favorite : $scope.selectedCustomer.favorite
    };

    $mdDialog.show({
      contentElement: document.querySelector('#edit-customer')
    });
  };//End function

  //Hides edit customer dialog on press of 'x'
  $scope.hideEditCustomer = function() {
    $mdDialog.hide();
  };//End function


  ////////////////////////////////////////////
  ///////////////////////////////////////////


});//End of CustomerDetailCtrl
