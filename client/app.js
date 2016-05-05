'use strict';

angular.module('app', [
  'ngRoute',
])
.config(function($locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true, // set HTML5 mode
                requireBase: false // I removed this to keep it simple, but you can set your own base url
            });
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/test', {templateUrl: 'test.html', controller: function() {
                console.log('On /test.');
            }})
            .when('/', {templateUrl: 'main.html', controller: 'MyTestCtrl'})
            .otherwise('/');
    })
    .controller('MyTestCtrl', function ($scope) {
        self = $scope;
        self.val = 'TeSt';
        self.counter = 0;
        var self = self;
        self.clicked = function() {
            self.counter++;
        };
    });
  // .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  //   $urlRouterProvider
  //   .otherwise('/');
  //
  //   $locationProvider.html5Mode(true);
  // });
