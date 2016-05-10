// var app = angular.module('app');
// app.controller('test', ['$scope', '$http', '$filter', 'autocomplete', 'MyService',
// function($scope, $http, $filter, MyService) {
//   // ...
//   $scope.checkModel = {
//    left: false,
//    middle: true,
//    right: false
//  };
//
//  $scope.checkResults = [];
//
//  $scope.$watchCollection('checkModel', function () {
//    $scope.checkResults = [];
//    angular.forEach($scope.checkModel, function (value, key) {
//      if (value) {
//        $scope.checkResults.push(key);
//      }
//    });
//  });
//   $scope.totalDisplayed = 20;
//   $scope.Math = window.Math;
//   $scope.colum = 4;
//   $scope.update = "";
//   $scope.loadMore = function () {
//     $scope.totalDisplayed += 20;
//   };
//   $scope.getnext = function (length, current) {
//       $scope.numb = length;
//       return $scope.Math.min($scope.colum, length-current);
//   };
//
//   $scope.abbrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
//   $scope.movies = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
//   $scope.second = []
//
//   $scope.random = "Y";
//   // $scope.movies = someMovies;
//   $scope.counter = 0;
//
//   $scope.addOrRemove = function(array, value) {
//       var index = array.indexOf(value);
//
//       if (index === -1) {
//           array.push(value);
//       } else {
//           array.splice(index, 1);
//       }
//   }
//   $scope.selecter = function(typed){
//     $scope.output = typed;
//     var index = $scope.movies.indexOf(typed);
//     $scope.status = $scope.abbrev[index];
//     $scope.obj = $scope.state[$scope.abbrev[index]];
//     $scope.items2 = $scope.state[$scope.abbrev[index]];
//     $scope.counter = 0;
//
//   }
//   $scope.list = [0,1,2,3];
//
//   // $scope.lister()
//   $scope.select = "TX";
//   $scope.state = MyService.doStuff();
//   $scope.obj = $scope.state["TX"];
//   $scope.items2 = $scope.state["TX"];
//
//
//
//
// }]);
