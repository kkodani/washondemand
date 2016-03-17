angular.module('wod.services', [])
.factory('locFactory', locFactory);

function locFactory($window, $q, $http) {

  var LOCALURL = 'http://localhost:8000/';

  var locData = {
    found: false,
    userType: '',
    email: '',
    lat: undefined,
    lng: undefined
  };

  return {
    locData: locData,
    getLoc: getLoc,
    sendLocToServer: sendLocToServer,
    resetLocData: resetLocData
  };

  function getLoc(userType, email) {
    var deferred = $q.defer();
    if (!$window.navigator.geolocation) {
      deferred.reject('Geolocation not supported.');
    }
    else {
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        locData.found = true;
        locData.userType = userType;
        locData.email = email;
        locData.lat = position.coords.latitude;
        locData.lng = position.coords.longitude;
        console.log('location found!')
        deferred.resolve(position);
      }, function(err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  }

  function sendLocToServer() {

    return $http({
      method: 'POST',
      url: LOCALURL + 'api/' + locData.userType + '/updateLocation',
      data: locData
    })
    .then(function(results) {
      //console.log(locData);
    });
  }

  function resetLocData() {

    locData.found = false;
    locData.userType = '';
    locData.email = '';
    locData.lat = undefined;
    locData.lng = undefined;
  }
}
