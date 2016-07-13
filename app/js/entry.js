const angular = require('angular');
const portApp = angular.module('portApp', []);

require('./badges')(portApp);
require('./projects')(portApp);
