// require('./reset.less');

angular.module('app', [
  'angular-ui-router', 'autocomplete'])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) {
    // $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('main', {
      url: '/',
      template: require('./main.page.html'),
      controller: require('./main.ctrl.es6.js'),
      title: ''
    })
    .state('test', {
      url: '/test',
      template: require('./test.html'),
      controller: require('./test.ctrl.es6.js'),
      title: ''
    })
    $locationProvider.html5Mode(true);

  });
