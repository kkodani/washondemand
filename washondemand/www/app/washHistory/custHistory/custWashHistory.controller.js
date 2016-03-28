angular.module('wod.custWashHistCtrl', []).controller('custWashHistCtrl', custWashHistCtrl);

custWashHistCtrl.$inject = ['washHistFactory'];

function custWashHistCtrl(washHistFactory) {
  var vm = this;

  vm.numEntries = 10;
  vm.history = [];

  vm.toggleExpand = function(wash) {
    wash.expanded = !wash.expanded;
  };

  vm.formatTime = function(time) {
    return washHistFactory.formatTime(time);
  };

  vm.formatRating = function(rating) {
    return washHistFactory.formatRating(rating);
  };

  vm.displayMoreEntries = function() {
    if (vm.numEntries < vm.history.length) {
      vm.numEntries += 10;
    }
  };

  washHistFactory.getHistory()
  .then(function(history) {
    vm.history = history;
  });

};
