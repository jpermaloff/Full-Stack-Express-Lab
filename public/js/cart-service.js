"use strict";
function CartService($http) {
    const vm = this;

    vm.getAllItems = () => {
     return $http({
        url: "/api/shop/cart",
        method: "GET"                 
     }).then((response) => {
        return vm.shoppingCart = response.data;         
     })
    }

    vm.deleteCartItem = function (index) {
        return $http({
            url: "/api/shop/cart/" + index,
            method: "DELETE"
        }).then(function (response) {
            return vm.shoppingCart = response.data;
        })                
    }

    vm.updateCartItem = (index, newItem) => {
        return $http({
            url: "/api/shop/cart/" + index,
            method : "PUT",
            data: newItem                                
        }).then((response) => { 
            return vm.shoppingCart = response.data                                          
        });                                                                
    }        

    vm.postCartItem = (newItem) => {
        return $http({
            url: "api/shop/cart/",
            method: "POST",
            data: newItem                                                                                                                        
        }).then((response) => {
            return vm.shoppingCart = response.data;                        
        });                
    }
}

angular
.module("App")
.service("CartService", CartService);