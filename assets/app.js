'use strict'

var gui = require('nw.gui');
var nodeWebkit = require('./app/webkit_service');
var ticker = require('./app/ticker_service');
var clock = require('./app/clock_service');
var asClockFilter = require('./app/as_clock_filter');
var timerController = require('./app/timer_controller');

angular.module('timerApp', [])
  .value('nodeWebkit', nodeWebkit)
  .factory('ticker', ticker)
  .factory('clock', clock)
  .filter('asClock', asClockFilter)
  .controller('TimerController', timerController);

nodeWebkit.start(gui);
