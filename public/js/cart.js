"use strict"
const cart = {
template: `
<section class="container">
<form>
  <button ng-click="$ctrl.getAllItems();">Get Items</button>
    <input type="text" ng-model="$ctrl.newItem.product" placeholder="Product">
    <input type="text" ng-model="$ctrl.newItem.price" placeholder="Price">
    <input type="text" ng-model="$ctrl.newItem.quantity" placeholder="Quantity">
    <button ng-click="$ctrl.addItem($ctrl.newItem);">Add Item</button>
  </form>
  <section class="listSection" ng-repeat="item in $ctrl.shoppingCart track by $index">
  <p class="item"> Product: {{ item.product }} </p>
  <p class="item"> Price: {{ item.price | currency}} </p>
  <p class="item"> Quantity: {{ item.quantity }} </p>
    <button ng-click="$ctrl.deleteItem($ctrl.shoppingCart[$index].id);">X</button>
    <input type="text" ng-model="$ctrl.newItem[$index].quantity" placeholder="Update Quantity">
    <button ng-click="$ctrl.updateItem($ctrl.shoppingCart[$index].id, $ctrl.newItem[$index]);">Update Quantity</button>
  </section>
  </section>
  `,
  controller: ["CartService", function(CartService){
      const vm = this;
      vm.getAllItems = () => {
        CartService.getAllItems().then((response) => {
            vm.shoppingCart = response;
        });
      };
      vm.addItem = (newItem) => {
          CartService.postCartItem(newItem).then((response) => {
              vm.shoppingCart = response;
          });
      };
      vm.updateItem = (index, newItem) => {
          CartService.updateCartItem(index, newItem).then((response) => {
            vm.shoppingCart = response;
          });
    }
      vm.deleteItem = (index) => {
          CartService.deleteCartItem(index).then((response) => {
              vm.shoppingCart = response;
          });
      }
  }]
}

angular.module("App")
.component("cart", cart);