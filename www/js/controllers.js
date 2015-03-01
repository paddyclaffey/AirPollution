angular.module('starter.controllers', ['ionic'])
.constant('FORECASTIO_KEY', 'a532158993c5a573dc7622ebb257f152')
.controller('HomeCtrl', function($scope,$state,Weather,DataStore) {
    	//read default settings into scope
    	console.log('inside home');
	console.log('GPS Check from Controller');
	
	$scope.getLocation = function(){				
		var latlng = [];
		console.log('GPS Check from inside function');
		navigator.geolocation.getCurrentPosition(
		function (position){
			DataStore.setLatitude(position.coords.latitude);
			DataStore.setLongitude(position.coords.longitude);		
		},
		function (error){
			console.log('GPS Unavailable');
			DataStore.setLongitude('GPS Unavailable');
		});
		$scope.longitude = DataStore.longitude;
		$scope.latitude = DataStore.latitude;

		var latlng = new google.maps.LatLng(parseFloat(DataStore.longitude), parseFloat(DataStore.latitude));
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					DataStore.city = (results[1].formatted_address);
    					$scope.city  = DataStore.city;
				}
			} 
			else {
				console.log("Geocoder failed due to: " + status);
    				$scope.city  = "Geocoder failed";
			}
		});
	}

    	$scope.city  = DataStore.city;
	$scope.o2 = DataStore.o2;
	$scope.n3 = DataStore.n3;
	$scope.longitude = DataStore.longitude;
	$scope.latitude = DataStore.latitude;
	
	var longitude =	5.31666667;
	var latitude = -6.233333;
    //all getCurrentWeather method in factory ‘Weather’
    Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
		$scope.current = resp.data;
		console.log('GOT CURRENT', $scope.current);
      //debugger;
    }, function(error) {
		console.log('Unable to get current conditions');
		console.error(error);
    });
})

.controller('LocationsCtrl', function($scope,$state, Cities,DataStore) {
  $scope.cities = Cities.all();

  $scope.changeCity = function(cityId) {
    //get lat and longitude for seleted location
    var lat  = $scope.cities[cityId].lat; //latitude
    var lgn  = $scope.cities[cityId].lgn; //longitude
    var city = $scope.cities[cityId].name; //city name

    DataStore.setCity(city);
    DataStore.setLatitude(lat);
    DataStore.setLongitude(lgn);

    $state.go('tab.home');
  }
})
.controller('SettingsCtrl', function($scope) {
    //manages app settings
});