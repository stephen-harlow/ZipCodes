// require('reset.less');

angular.module('app', ['ngRoute', 'autocomplete', 'infinite-scroll'])
.config(function($locationProvider) {
  $locationProvider
  .html5Mode({
    enabled: true, // set HTML5 mode
    requireBase: false // I removed this to keep it simple, but you can set your own base url
  });
})
.config(function($routeProvider) {
  $routeProvider
  .when('/test', {templateUrl: 'test.html', controller: 'Test',resolve:{
      'MyServiceData':function(MyService){
        return MyService.promise;
      }
    }})
  .when('/', {templateUrl: 'main.html', controller: 'MyTestCtrl'})
  .otherwise('/');
})
.controller('MyTestCtrl', function ($scope) {
  console.log('On /main.');

  self = $scope;
  self.val = 'TeSt';
  self.counter = 0;
  var self = self;
  self.clicked = function() {
    self.counter++;
  };
})
.service('MyService', function($http) {
    var myData = null;

    var promise = $http.get('file.json').success(function (data) {
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
