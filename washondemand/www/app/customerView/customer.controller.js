angular.module('wod.customerCtrl', [])
.controller('customerCtrl', customerCtrl);

function customerCtrl($scope, NgMap, customerFactory, locFactory) {
  var vm = this;
  vm.request = {
    vehicleType: 'car',
    washType: 'basic'
  };
  vm.locData = locFactory.locData;

  vm.sendRequest = function() {
    vm.request.price = vm.washInfo.price;
    customerFactory.sendRequest(vm.request);
  };
  vm.selectVehicle = function(vehicle) {
    vm.request.vehicleType = vehicle;
  };
  vm.selectWash = function(wash) {
    vm.request.washType = wash;
    console.log(vm.request.washType);
    if (wash === 'basic') {
      vm.washInfo = customerFactory.data.basic;
    }
    if (wash === 'deluxe') {
      vm.washInfo = customerFactory.data.deluxe;
    }
    if (wash === 'premium') {
      vm.washInfo = customerFactory.data.premium;
    }
  };
  vm.selectWash('basic');
}
