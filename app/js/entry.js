const angular = require('angular');
const portApp = angular.module('portApp', [require('angular-route')]);

require('./services')(portApp);
require('./skills')(portApp);
require('./gameprojects')(portApp);
require('./webprojects')(portApp);

portApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'js/templates/home/views/home_view.html'
    })
    .when('/about', {
      templateUrl: 'js/templates/about/views/about_view.html'
    })
    .when('/webprojects', {
      templateUrl: 'js/templates/webprojects/views/webprojects_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/hue-manatee', {
      templateUrl: 'js/templates/webprojects/views/hue-manatee_view.html'
    })
    .when('/ebb-tracker', {
      templateUrl: 'js/templates/webprojects/views/ebb-tracker_view.html'
    })
    .when('/twitter-react', {
      templateUrl: 'js/templates/webprojects/views/twitter-react_view.html'
    })
    .when('/knowhuddle', {
      templateUrl: 'js/templates/webprojects/views/knowhuddle_view.html'
    })
    .when('/responsibuyer', {
      templateUrl: 'js/templates/webprojects/views/responsibuyer_view.html'
    })
    .when('/gameprojects', {
      templateUrl: 'js/templates/gameprojects/views/gameprojects_view.html',
      controller: 'GameProjectsController',
      controllerAs: 'gameprojectsctrl'
    })
    .when('/create', {
      templateUrl: 'js/templates/create/views/create_view.html'
    })
    // .when('/skills', {
    //   templateUrl: 'js/templates/skills/views/skills_view.html',
    //   controller: 'SkillsController',
    //   controllerAs: 'skillsctrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
}]);
