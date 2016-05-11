// require('reset.less');
console.log("Main");
var app = angular.module('app', ['matchmedia-ng', 'uiGmapgoogle-maps', 'ngRoute', 'autocomplete', 'infinite-scroll', 'ui.select', 'ngSanitize', 'ui.bootstrap']);
app.config(function($locationProvider) {
  $locationProvider
  .html5Mode({
    enabled: true, // set HTML5 mode
    requireBase: false // I removed this to keep it simple, but you can set your own base url
  });
});
app.directive("scroll", function ($window) {
  return function(scope, element, attrs) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 75) {
        scope.boolChangeClass = true;
      } else {
        scope.boolChangeClass = false;
      }
      scope.$apply();
    });
  };
});
app.filter('emptyFilter', function() {
  return function(array) {
    var filteredArray = [];
    angular.forEach(array, function(item) {
      if (item) filteredArray.push(item);
    });
    return filteredArray;
  };
});
app.config(function($routeProvider) {
  $routeProvider
  .when('/test', {templateUrl: 'views/zips.html', controller: 'zips',resolve:{
    'MyServiceData':function(MyService){
      return MyService.promise;
    }}})
    .when('/', {templateUrl: 'views/test.html', controller: 'test',resolve:{
      'MyServiceData':function(MyService){return MyService.promise;}
    }})
    .otherwise('/');
  });
  console.log("Configed");
  app.service('MyService', function($http) {
    var myData = null;

    var promise = $http.get('little.json').success(function (data) {
      myData = data;
    });

    return {
      promise:promise,
      setData: function (data) {
        myData = data;
      },
      doStuff: function () {
        return myData;//.getSomeData();
      }
    };
  });

app.controller('mainCtrl', function($scope) {

    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];

  });




  app.controller('test', ['$scope', '$http', '$filter', 'MyService', 'matchmedia',
  function($scope, $http, $filter, MyService, matchmedia) {
    $scope.showMap = true;
    $scope.randomMarkers = [];

    $scope.flip = function () {
      console.log("flip")
      if($scope.showMap){
        $scope.showMap = false;
        $scope.theImage = "loads/map.png";

      }
      else{
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
        $scope.theImage = "loads/list.png";

        $scope.showMap = true;

        $scope.colum = 3;
        $scope.shorter = 2;

      }
      console.log("isDesktop" + $scope.isDesktop);


    });
    var unTab = matchmedia.onTablet( function(mediaQueryList){

      $scope.isTablet = mediaQueryList.matches;
      if($scope.isTablet){
        $scope.theImage = "loads/list.png";
        $scope.showMap = true;

        $scope.colum = 2;
        $scope.shorter = 2;
      }
      console.log("isTablet" + $scope.isTablet);
    });
    var unPhone = matchmedia.onPhone( function(mediaQueryList){

      $scope.heighter = 50;
      $scope.isPhone = mediaQueryList.matches;
      if($scope.isPhone){
        $scope.theImage = "loads/map.png";
         $scope.showMap = false;
        $scope.colum = 2;
        $scope.shorter = 1;

      }
      console.log("isPhone" + $scope.isPhone);
    });

    $scope.loading = [];
    $scope.map = {
      center: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      zoom: 4,
      bounds: {},
      markers: []
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
    $scope.$root.windowClicked = function (m) {
      alert('here');
      $scope.set(m.id);
      $scope.getCenter({code:m.id});
    };

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
    $scope.onMarkerClicked = function (m) {
      //this.windowOptions = !this.windowOptions;
      var index = $scope.randomMarkers.indexOf(m);
      var val = $scope.loading.indexOf(m);
      if(val !== -1){
        $scope.loading.splice(val, 1);
      }
      $scope.randomMarkers.splice(index, 1);
      console.log('My Marker was clicked');
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

  app.controller('zips', ['$scope', '$http', '$filter', 'MyService',
  function($scope, $http, $filter, MyService) {
    console.log("Here tho?");

    $scope.totalDisplayed = 20;
    $scope.Math = window.Math;
    $scope.colum = 4;
    $scope.update = "";
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


  function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
