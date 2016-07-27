const angular = require('angular');
const portApp = angular.module('portApp', []);

require('./badges')(portApp);
require('./gameprojects')(portApp);
require('./webprojects')(portApp);
