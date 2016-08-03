const angular = require('angular');
const portApp = angular.module('portApp', [require('angular-route')]);

require('./services')(portApp);
require('./badges')(portApp);
require('./gameprojects')(portApp);
require('./webprojects')(portApp);

portApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'js/templates/home/views/home_view.html'
    })
    .when('/webprojects', {
      templateUrl: 'js/templates/webprojects/views/webprojects_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/create', {
      templateUrl: 'js/templates/create/views/create_view.html'
    })
    .when('/badges', {
      templateUrl: 'js/templates/badges/views/badges_view.html',
      controller: 'BadgesController',
      controllerAs: 'badgesctrl'
    })
    .when('/gameprojects', {
      templateUrl: 'js/templates/gameprojects/views/gameprojects_view.html',
      controller: 'GameProjectsController',
      controllerAs: 'gameprojectsctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
