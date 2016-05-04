function config($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

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
  });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];
