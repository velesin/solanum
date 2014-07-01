'use strict'

var nodeWebkit = require('./app/webkit_service');
var timerCtrl = require('./app/timer_controller');
var asClockFilter = require('./app/as_clock_filter');

angular.module('timerApp', [])
  .value('nodeWebkit', nodeWebkit)
  .controller('TimerCtrl', timerCtrl)
  .filter('asClock', asClockFilter);

nodeWebkit.start(require('nw.gui'));
