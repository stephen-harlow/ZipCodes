// require('reset.less');

angular.module('app', ['ngRoute', 'autocomplete'])
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
.controller('Test', function ($scope, $http, $filter, MyService) {
  $scope.abbrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  $scope.movies = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];


  // $scope.movies = someMovies;

  $scope.selecter = function(typed){
    $scope.output = typed;
    var index = $scope.movies.indexOf(typed);
    $scope.status = $scope.abbrev[index];
    $scope.obj = $scope.state[$scope.abbrev[index]];
    $scope.items2 = $scope.state[$scope.abbrev[index]];
  }

  $scope.list = [0,1,2];
  $scope.select = "TX";
  $scope.state = MyService.doStuff();
  $scope.obj = $scope.state["TX"];
  $scope.items2 = $scope.state["TX"];

  $scope.warn = function () {
    $scope.obj = [];
    $scope.count = 0;
    angular.forEach($scope.items2, function(item) {
      var regex = new RegExp('\\b' + escapeRegExp($scope.output), 'i');
      //
      if(regex.test(item.code)||regex.test(item.name)){
        $scope.count++;
        $scope.obj.push(item);

        //  $scope.obj.push(item);
      };
    });

  };




  $scope.updateBar = function(val) {
    if(val.length > 0) {
      $scope.obj = [];
      $scope.count = 0;
      $scope.please = $scope.items2;

      angular.forEach($scope.items2, function(item) {
        var regex = new RegExp('\\b' + escapeRegExp(val), 'i');
        //
        if(regex.test(item.code)||regex.test(item.name)){
          $scope.count++;
          $scope.obj.push(item);

          //  $scope.obj.push(item);
        };
      });
    }else {
      $scope.obj = $scope.items2;
    }
  };

}).service('MyService', function($http) {
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
