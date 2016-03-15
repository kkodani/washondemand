angular.module('wod.services', [])
.factory('locFactory', locFactory);

function locFactory($window, $q) {
  return {
    getLoc: getLoc
  };

  function getLoc() {
    var deferred = $q.defer();
    if (!$window.navigator.geolocation) {
      deferred.reject('Geolocation not supported.');
    }
    else {
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve(position);
      }, function(err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  }
}
