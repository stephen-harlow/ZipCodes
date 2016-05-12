// require('reset.less');
console.log("Main");
var app = angular.module('app', ['angularResizable', 'angular.filter', 'ngMaterial', 'matchmedia-ng', 'uiGmapgoogle-maps', 'ngRoute', 'autocomplete', 'infinite-scroll', 'ui.select', 'ngSanitize', 'ui.bootstrap']);
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
app.filter('search', function() {
  return function(items, str) {
    if(str == '') return items;

    var filtered = [];
    var rgx = new RegExp(str, 'gi');

    angular.forEach(items, function(item) {
      item.points = (JSON.stringify(item).match(rgx) || []).length;

      if(item.points > 0) filtered.push(item);
    });

    return filtered;
  }
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

  function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
