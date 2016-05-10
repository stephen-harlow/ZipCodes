// require('reset.less');
console.log("Main");
var app = angular.module('app', ['uiGmapgoogle-maps', 'ngRoute', 'autocomplete', 'infinite-scroll', 'ui.select', 'ngSanitize', 'ui.bootstrap']);
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
  .when('/test', {templateUrl: 'views/test.html', controller: 'test',resolve:{
    'MyServiceData':function(MyService){
      return MyService.promise;
    }}})
    .when('/', {templateUrl: 'views/zips.html', controller: 'zips',resolve:{
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
  app.controller('test', ['$scope', '$http', '$filter', 'MyService',
  function($scope, $http, $filter, MyService) {

    $scope.loading = [];
    $scope.map = {
      center: {
        latitude: 42.3349940452867,
        longitude:-71.0353168884369
      },
      zoom: 4,
      markers: [],
      markersEvents: {
        click: function(marker, eventName, model, arguments) {
          console.log('Marker was clicked (' + marker + ', ' + eventName);//+', '+mydump(model, 0)+', '+mydump(arguments)+')');
          var index = $scope.map.markers.indexOf(marker);
          console.log(marker.id);
          $scope.loading[marker.id] = false;
          $scope.map.markers.splice(index, 1);
          $scope.$apply();
        }
      },
      window: {
        marker: {},
        show: false,
        closeClick: function() {
          this.show = false;
        },
        options: {}, // define when map is ready
        title: ''
      }
    };

    //$scope.window = false;
    $scope.set = function (m) {
      $scope.loading[m] = !$scope.loading[m];
    };
    $scope.onMarkerClicked = function (m) {
      //this.windowOptions = !this.windowOptions;
      var index = $scope.map.markers.indexOf(m);
      $scope.loading[m.id] = false;
      $scope.map.markers.splice(index, 1);
      $scope.$apply();

      console.log('Marker was clicked');
    };

    $scope.closeClick = function () {
      this.window = false;
    };

    console.log("Here tho?");

    $scope.totalDisplayed = 20;
    $scope.Math = window.Math;
    $scope.colum = 4;
    $scope.update = "";
    $scope.getCenter = function (item) {
      if($scope.loading[item.code]){
      var marker = {
        id: item.code,
        coords: {
          latitude: item.Latitude,
          longitude: item.Longitude
        }

      };
      $scope.map.markers.push(marker);
    }
    else{
      angular.forEach($scope.map.markers, function(val) {
        if (item.id.equals(item.code)) {
              var index = $scope.map.markers.indexOf(val);
              $scope.map.markers.splice(index, 1);
              $scope.$apply();

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
