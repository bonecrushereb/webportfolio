const angular = require('angular');
const portApp = angular.module('portApp', []);

require('./services')(portApp);
require('./badges')(portApp);
require('./gameprojects')(portApp);
require('./webprojects')(portApp);
