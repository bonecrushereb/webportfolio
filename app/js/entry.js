const angular = require('angular');
const portApp = angular.module('portApp', [require('angular-route')]);

require('./services')(portApp);
require('./skills')(portApp);
require('./gameprojects')(portApp);
require('./webprojects')(portApp);

portApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/', {
      templateUrl: 'js/templates/home/views/home_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/about', {
      templateUrl: 'js/templates/about/views/about_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/webprojects', {
      templateUrl: 'js/templates/webprojects/views/webprojects_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/personal-website', {
      templateUrl: 'js/templates/webprojects/views/portfolio_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/hue-manatee', {
      templateUrl: 'js/templates/webprojects/views/hue-manatee_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/ebb-tracker', {
      templateUrl: 'js/templates/webprojects/views/ebb-tracker_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/twitter-react', {
      templateUrl: 'js/templates/webprojects/views/twitter-react_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/knowhuddle', {
      templateUrl: 'js/templates/webprojects/views/knowhuddle_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
    })
    .when('/responsibuyer', {
      templateUrl: 'js/templates/webprojects/views/responsibuyer_view.html',
      controller: 'WebProjectsController',
      controllerAs: 'webprojectsctrl'
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
}]);
