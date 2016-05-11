// localStorage.setItem('testObject', JSON.stringify(testObject));
//
// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');

angular.module('app').controller('test', ['$scope', '$http', '$filter', 'MyService', 'matchmedia',
function($scope, $http, $filter, MyService, matchmedia){
  // in controller
  $scope.override = false;
  $scope.showMap = true;
  $scope.randomMarkers = [];
  $scope.loading = [];
  if (localStorage.getItem("loading") !== null) {
    $scope.loading = JSON.parse(localStorage["loading"]);
    var markers =  JSON.parse(localStorage["markers"]);
    $scope.randomMarkers = markers;
  }
  $scope.map = {
    center: {
      latitude: 40.1451,
      longitude: -99.6680
    },
    zoom: 4,
    bounds: {},
    markers: [],
    markersEvents : {
      dblclick: function (gMarker, eventName, model, latLngArgs){
        $scope.set(model.id);
        $scope.getCenter({code:model.id});
      },
      mouseout: function (gMarker, eventName, model, latLngArgs) {
        model.show = false;
      },
      mouseover: function (gMarker, eventName, model, latLngArgs) {
        model.show = true;
      }
    },
    events: {

      tilesloaded: function (map) {
        $scope.$apply(function () {
          $scope.mappa = map;
        });

      }

    }
  };
  $scope.options = {
    scrollwheel: true
  };
  $scope.create = function (m) {
    if($scope.colum == 2){
      return [m, m+1];
    }
    else{
      return [m, m+1, m+2];
    }
  };
  $scope.createsub = function (m, le) {
    var i = 0;
    if(le == 2){
      return [m, m+1];
    }
    else if (le == 1){
      return [m];
    }
    else{
      return [m, m+1, m+2];
    }
  };
  $scope.init = function () {

    // check if there is query in url
    // and fire search in case its value is not empty
  };


  $scope.flip = function () {
    console.log("flip")
    if($scope.showMap){
      $scope.showMap = false;
      $scope.theImage = "loads/map.png";
      $scope.override = true;

    }
    else{
      $scope.override = true;
      $scope.showMap = true;
      $scope.theImage = "loads/list.png";
    }
  };

  $scope.heighter = 300;
  var wrap = $("#wrap");

  wrap.on("scroll", function(e) {

    if (this.scrollTop > 147) {
      wrap.addClass("fix-search");
    } else {
      wrap.removeClass("fix-search");
    }

  });
  $scope.colum = 2;
  $scope.theImage = "loads/list.png";

  var unDesk = matchmedia.onDesktop( function(mediaQueryList){

    $scope.isDesktop = mediaQueryList.matches;
    if($scope.isDesktop){
      if(!$scope.override){
        $scope.theImage = "loads/list.png";
        $scope.showMap = true;
      }
      $scope.colum = 3;
      $scope.shorter = 3;

    }
    console.log("isDesktop" + $scope.isDesktop);


  });
  var unTab = matchmedia.onTablet( function(mediaQueryList){

    $scope.isTablet = mediaQueryList.matches;
    if($scope.isTablet){
      if(!$scope.override){

        $scope.theImage = "loads/list.png";
        $scope.showMap = true;
      }
      $scope.colum = 2;
      $scope.shorter = 2;
    }
    console.log("isTablet" + $scope.isTablet);
  });
  var unPhone = matchmedia.onPhone( function(mediaQueryList){

    $scope.heighter = 50;
    $scope.isPhone = mediaQueryList.matches;
    if($scope.isPhone){
      if(!$scope.override){

        $scope.theImage = "loads/map.png";
        $scope.showMap = false;
      }
      $scope.colum = 2;
      $scope.shorter = 1;

    }
    console.log("isPhone" + $scope.isPhone);
  });

  //$scope.window = false;
  $scope.set = function (m) {
    var val = $scope.loading.indexOf(m);
    if(val !== -1){
      $scope.loading.splice(val, 1);
    }
    else{
      $scope.loading.push(m);
    }
  };


  $scope.title = "Window Title!";

  console.log("Here tho?");

  $scope.totalDisplayed = 20;
  $scope.Math = window.Math;
  $scope.update = "";
  $scope.getCenter = function (item) {
    var val = $scope.loading.indexOf(item.code);
    $scope.report = val;
    console.log("FILTERING");
    if(val > -1){
      var marker = {
        id: item.code,
        name: item.name,
        show: false,
        state: item.state,
        latitude: item.Latitude,
        longitude: item.Longitude
      };
      var markers = $scope.randomMarkers;
      markers.push(marker)

      $scope.randomMarkers = markers;
      // $scope.apply();
    }
    else{
      console.log("FOund it");
      angular.forEach($scope.randomMarkers, function(val) {
        if (angular.equals(item.code, val.id)) {
          var index = $scope.randomMarkers.indexOf(val);
          $scope.randomMarkers.splice(index, 1);
        }
      });
    }
    localStorage.setItem('loading', JSON.stringify($scope.loading));
    localStorage.setItem('markers', JSON.stringify($scope.randomMarkers));
  };
  $scope.loadMore = function () {
    $scope.totalDisplayed += 20;
  };
  $scope.getnext = function (length, current) {
    $scope.numb = length;
    return $scope.Math.min($scope.colum, length-current);
  };

  $scope.abbrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  $scope.movies = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  $scope.second = []

  $scope.random = "Y";
  // $scope.movies = someMovies;
  $scope.counter = 0;

  $scope.selecter = function(typed){
    $scope.output = typed;
    var index = $scope.movies.indexOf(typed);
    $scope.status = $scope.abbrev[index];
    $scope.obj = $scope.state[$scope.abbrev[index]];
    $scope.items2 = $scope.state[$scope.abbrev[index]];
    $scope.counter = 0;

  }
  $scope.list = [0,1,2,3];

  // $scope.lister()
  $scope.select = "TX";
  $scope.state = MyService.doStuff();
  $scope.obj = $scope.state["TX"];
  $scope.items2 = $scope.state["TX"];




}]);
