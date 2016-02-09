console.log("...loaded");

var app = angular.module('locationsApp', ['ngRoute']);

app.config(['$routeProvider', function( $routeProvider ){
  $routeProvider
  .when('/locations', {
    templateUrl: '/views/partials/location-list.html',
    controller: 'locationsController'
  })
  .when('/locations/:index', {
    templateUrl: '/views/partials/location-detail.html',
    controller: 'locationDetailController'
  })
  .otherwise({
    redirectTo: '/locations'
  });
}]);

app.controller('locationsController', ['$scope', function( $scope ){
  $scope.locations = locations;

  var myMap = {};

  myMap.init = function(){
    this.map;
    this.currentLatLng;
    this.zoom;
    this.mapEl;

    this.zoom = 12;
    this.mapEl = document.querySelector('#map');
    console.log(this.map);

    // New York's lat and lon
    this.currentLatLng = new google.maps.LatLng( 40.6974881, -73.979681 );

    // Create map
    this.map = new google.maps.Map( this.mapEl, {
      center: this.currentLatLng,
      zoom: this.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Create marker
    this.marker = new google.maps.Marker({
      position: this.currentLatLng,
      map: this.map,
      title: "Marker",
      animation: google.maps.Animation.BOUNCE

    });

    myMap.reCenterMap = function(){
      myMap.map.setZoom( myMap.zoom );
      myMap.map.setCenter( myMap.currentLatLng );
    }

    myMap.updateMarker = function(){
      myMap.marker.setPosition( myMap.currentLatLng );
      myMap.marker.setAnimation( google.maps.Animation.BOUNCE );
    }

    $scope.pickLocation = function(lat, lon){
      myMap.currentLatLng = new google.maps.LatLng( lat, lon);
      // update the marker
      myMap.updateMarker();
      // recenter the mapTypeId
      myMap.reCenterMap();
    }

  }

  myMap.init();

}]);

app.controller('locationDetailController', ['$scope', '$routeParams', function($scope, $routeParams){
  $scope.locations = locations;
  $scope.location = $scope.locations[$routeParams.index];
}]);
