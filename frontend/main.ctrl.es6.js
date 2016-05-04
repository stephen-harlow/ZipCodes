MainCtrl.$inject = ['$scope', '$http'];
function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function MainCtrl($scope, $http, $filter) {

  $scope.state = null;
  $http({method: 'GET', url: 'file.json'}).
  success(function(data, status, headers, config) {
    $scope.state=data;
    $scope.obj = $scope.state["TX"];
    $scope.items2 = $scope.state["TX"];

  }).error(function(data, status, headers, config) {
  });

  $scope.warn = function () {
    if (!$scope.search) {
      $scope.obj = $scope.state[$scope.rightone];
      $scope.items2 = $scope.state[$scope.rightone];
    };
    $scope.obj = [];
    $scope.count = 0;
    angular.forEach($scope.items2, function(item) {
      var regex = new RegExp('\\b' + escapeRegExp($scope.search), 'i');
      //
      if(regex.test(item.code)||regex.test(item.name)){
        $scope.count++;
        $scope.obj.push(item);

        //  $scope.obj.push(item);
      };
    });

  };

  $scope.list = [0,1,2];
  $scope.select = "TX";
  $scope.selection=[{long: "Alabama", id: 1, name: "AL"}, {long: "Alaska", id: 2, name: "AK"}, {long: "Arizona", id: 3, name: "AZ"}, {long: "Arkansas", id: 4, name: "AR"}, {long: "California", id: 5, name: "CA"}, {long: "Colorado", id: 6, name: "CO"}, {long: "Connecticut", id: 7, name: "CT"}, {long: "Delaware", id: 8, name: "DE"}, {long: "Florida", id: 9, name: "FL"}, {long: "Georgia", id: 10, name: "GA"}, {long: "Hawaii", id: 11, name: "HI"}, {long: "Idaho", id: 12, name: "ID"}, {long: "Illinois", id: 13, name: "IL"}, {long: "Indiana", id: 14, name: "IN"}, {long: "Iowa", id: 15, name: "IA"}, {long: "Kansas", id: 16, name: "KS"}, {long: "Kentucky", id: 17, name: "KY"}, {long: "Louisiana", id: 18, name: "LA"}, {long: "Maine", id: 19, name: "ME"}, {long: "Maryland", id: 20, name: "MD"}, {long: "Massachusetts", id: 21, name: "MA"}, {long: "Michigan", id: 22, name: "MI"}, {long: "Minnesota", id: 23, name: "MN"}, {long: "Mississippi", id: 24, name: "MS"}, {long: "Missouri", id: 25, name: "MO"}, {long: "Montana", id: 26, name: "MT"}, {long: "Nebraska", id: 27, name: "NE"}, {long: "Nevada", id: 28, name: "NV"}, {long: "New Hampshire", id: 29, name: "NH"}, {long: "New Jersey", id: 30, name: "NJ"}, {long: "New Mexico", id: 31, name: "NM"}, {long: "New York", id: 32, name: "NY"}, {long: "North Carolina", id: 33, name: "NC"}, {long: "North Dakota", id: 34, name: "ND"}, {long: "Ohio", id: 35, name: "OH"}, {long: "Oklahoma", id: 36, name: "OK"}, {long: "Oregon", id: 37, name: "OR"}, {long: "Pennsylvania", id: 38, name: "PA"}, {long: "Rhode Island", id: 39, name: "RI"}, {long: "South Carolina", id: 40, name: "SC"}, {long: "South Dakota", id: 41, name: "SD"}, {long: "Tennessee", id: 42, name: "TN"}, {long: "Texas", id: 43, name: "TX"}, {long: "Utah", id: 44, name: "UT"}, {long: "Vermont", id: 45, name: "VT"}, {long: "Virginia", id: 46, name: "VA"}, {long: "Washington", id: 47, name: "WA"}, {long: "West Virginia", id: 48, name: "WV"}, {long: "Wisconsin", id: 49, name: "WI"}, {long: "Wyoming", id: 50, name: "WY"}, {long: "District of Columbia", id: 51, name: "DC"}];


  $scope.movies = []

  // gives another movie array on change
  $scope.updateMovies = function(typed){
    if($scope.movies.length < 10){
      angular.forEach($scope.selection, function(item) {
        $scope.movies.push(item.long);
        //  $scope.obj.push(item);
      });
    };
  }
  $scope.select = function(typed){
    if (!$scope.search) {
      $scope.obj = $scope.state[$scope.rightone];
      $scope.items2 = $scope.state[$scope.rightone];
      $scope.status = "Empty" + typed;
    }
    else{
      $scope.output = $scope.rightone;
      $scope.status = "Selecting" + typed;
      angular.forEach($scope.selection, function(item) {
        if((item.long.toUpperCase()).indexOf(typed.toUpperCase()) != -1){
          $scope.output = item.name
          $scope.rightone = item.name
        }
      });
      // MovieRetriever could be some service returning a promise
      // $scope.chosen = typed;
      // $scope.rightone = $scope.yourchoice;


      // $scope.select = $scope.rightone;
      $scope.obj = $scope.state[$scope.rightone];
      $scope.please = $scope.obj;
      $scope.items2 = $scope.state[$scope.rightone];
    }
    warn();

    // $scope.rightone = object_by_id;

  }

  $scope.$watch('yourchoice', function(val){

    // $scope.output = val;
    // $scope.status = "Watching";

    angular.forEach($scope.selection, function(item) {
      if((item.long.toUpperCase()).indexOf(val.toUpperCase()) != -1){
        $scope.rightone = item.name
      }
    });
  });
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

}

export default MainCtrl;
