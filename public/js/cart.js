"use strict"
const cart = {
template: `
<section class=formSection>
<section class="getBtn">
  <button ng-click="$ctrl.getAllItems();">Get Items</button>
  </section>
  <form ng-submit="$ctrl.addItem($ctrl.newItem);">
    <input type="text" ng-model="$ctrl.newItem.product" placeholder="Product">
    <input type="text" ng-model="$ctrl.newItem.price" placeholder="Price">
    <input type="text" ng-model="$ctrl.newItem.quantity" placeholder="Quantity">
    <button>Add Item</button>
  </form>
  </section>
  <section class="listSection" ng-repeat="item in $ctrl.shoppingCart track by $index">
  <p class="item"> Product: {{ item.product }} </p>
  <p class="item"> Price: $ {{ item.price }} </p>
   <p class="item"> Quantity: {{ item.quantity }} </p>
    <button ng-click="$ctrl.deleteItem($ctrl.shoppingCart[$index].id);">X</button>
    <button ng-click="$ctrl.updateItem($ctrl.shoppingCart[$index].id, $ctrl.newItem);">Update</button>
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