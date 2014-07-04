'use strict'

var nodeWebkit = require('./app/webkit_service');
var clock = require('./app/clock_service');
var timerCtrl = require('./app/timer_controller');
var asClockFilter = require('./app/as_clock_filter');

angular.module('timerApp', [])
  .value('nodeWebkit', nodeWebkit)
  .factory('clock', clock)
  .controller('TimerCtrl', timerCtrl)
  .filter('asClock', asClockFilter);

nodeWebkit.start(require('nw.gui'));
