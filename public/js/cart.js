"use strict"
const cart = {
template: `
<section class="getBtn">
  <button ng-click="$ctrl.getAllItems();">Get Items</button>
  </section>
  <form ng-submit="$ctrl.postCartItem($ctrl.newItem);">
    <input type="text" ng-model="$ctrl.newItem.product" placeholder="product">
    <input type="text" ng-model="$ctrl.newItem.price" placeholder="Price">
    <input type="text" ng-model="$ctrl.newItem.quantity" placeholder="Quantity">
    <button>Add Item</button>
  </form>
  <p ng-repeat="item in $ctrl.shoppingCart track by $index">
  {{ item }}
    <button ng-click="$ctrl.deleteCartItem($ctrl.shoppingCart[$index].id);">X</button>
    <button ng-click="$ctrl.updateCartItem($ctrl.shoppingCart[$index].id, $ctrl.newItem);">Update</button>
  </p>
  `,
  controller: ["CartService", function(CartService){
      const vm = this;
      vm.getAllItems = () => {
        CartService.getAllItems().then((response) => {
            vm.shoppingCart = response;
        });
      };
      vm.postCartItem = (newItem) => {
          CartService.postCartItem(newItem).then((response) => {
              vm.shoppingCart = response;
          });
      };
      vm.updateCartItem = (index, newItem) => {
          CartService.updateCartItem(index, newItem).then((response) => {
            vm.shoppingCart = response;
          });
    }
      vm.deleteCartItem = (index) => {
          CartService.deleteCartItem(index).then((response) => {
              vm.shoppingCart = response;
          });
      }
  }]
}

angular.module("App")
.component("cart", cart);