'use strict'

var nodeWebkit = require('./app/webkit_service.js');
var timerCtrl = require('./app/timer_controller.js');

angular.module('timerApp', [])
  .value('nodeWebkit', nodeWebkit)
  .controller('TimerCtrl', timerCtrl);

nodeWebkit.start(require('nw.gui'));
