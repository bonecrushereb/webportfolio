const angular = require('angular');
const portApp = angular.module('portApp');

require('./services')(portApp);
require('./skills')(portApp);
require('/gameprojects')(portApp);
require('./webprojects')(portApp);

portApp.config('$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'js/templates/home/views/home_view.html'
    })
    .when('/webprojects', {
      templateUrl: 'js/templates/webprojects/views/webprojects_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/gameprojects', {
      templateUrl: 'js/templates/gameprojects/views/gameprojects_view.html',
      controller: 'GameProjectsController',
      controllerAs: 'gameprojectsctrl'
    })
    .when('/create', {
      templateUrl: 'js/templates/create/views/create_view.html'
    })
    .when('/skills', {
      templateUrl: 'js/templates/skills/views/skills_view.html',
      controller: 'SkillsController',
      controllerAs: 'skillsctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
