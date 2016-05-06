angular.module("app", ['ngMaterial'])
.controller('Test', ['$scope', '$http', '$filter', 'autocomplete', 'MyService', Test]);

function Test($scope, $http, $filter, MyService) {
     $scope.abbrev = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
     $scope.movies = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

     $scope.random = "Y";
     // $scope.movies = someMovies;
    $scope.colum = 4;
     $scope.selecter = function(typed){
       $scope.output = typed;
       var index = $scope.movies.indexOf(typed);
       $scope.status = $scope.abbrev[index];
       $scope.obj = $scope.state[$scope.abbrev[index]];
       $scope.items2 = $scope.state[$scope.abbrev[index]];
     }
     $scope.lister = function (b) {
       var list = [];
       var m = 0;

       for(var i = b; i < b+$scope.colum && i < $scope.obj.length && m < $scope.obj.length; i++) {
           list.push(m);
           m++;
       }
       return list;
     };

     // $scope.lister()
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

};
