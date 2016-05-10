angular.module("app", ['ngMaterial', 'infinite-scroll'])
.controller('zips', ['$scope', '$http', '$filter', 'autocomplete', 'MyService', 'myContent', zips]);
//http://www.zip-info.com/cgi-local/zipsrch.exe?ac=ac&pop=pop&zip=75080&Go=Go
function zips($scope, $http, $filter, MyService) {

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

  $scope.lister = function (b, l) {
    var m = 0;
    $scope.checker = $scope.obj.length + " " + l + " " + b + " " +$scope.colum;
    for(var i = b; m < l && m < b + $scope.colum && i < b+$scope.colum && i < $scope.obj.length && m < $scope.obj.length; i++) {
      list.push(m);
      m++;
    }
    return list;
  };


  $scope.warn = function () {
    $scope.obj = [];
    $scope.count = 0;
    //  angular.forEach($scope.items2, function(item) {
    //    var regex = new RegExp('\\b' + escapeRegExp($scope.output), 'i');
    //    //
    //    if(regex.test(item.code)||regex.test(item.name)){
    //      $scope.count++;
    //      $scope.obj.push(item);
    //
    //      //  $scope.obj.push(item);
    //    };
    //  });

  };




  $scope.updateBar = function(val) {
    //  if(val.length > 0) {
    //    $scope.obj = [];
    //    $scope.count = 0;
    //    $scope.please = $scope.items2;
    //
    //    angular.forEach($scope.items2, function(item) {
    //      var regex = new RegExp('\\b' + escapeRegExp(val), 'i');
    //      //
    //      if(regex.test(item.code)||regex.test(item.name)){
    //        $scope.count++;
    //        $scope.obj.push(item);
    //
    //        //  $scope.obj.push(item);
    //      };
    //    });
    //  }else {
    //    $scope.obj = $scope.items2;
    //  }
  };

};
