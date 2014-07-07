'use strict'

var moment = require('moment');
var config = require('../config');

function Clock($timeout, callbacks) {
  var focusDuration = moment.duration(config.focusDurationMinutes, 'minutes').asMilliseconds();
  var warningPeriod = moment.duration(config.warningPeriodSeconds, 'seconds').asMilliseconds();
  var clockRefreshInterval = 250;

  var tick;

  var activeTimer = null;
  var startTime;
  var breakWarning;

  function start() {
    stop();
    startTime = moment();
    breakWarning = true;
    tick();
  };

  function stop() {
    if (activeTimer) {
      $timeout.cancel(activeTimer);
      activeTimer = null;
    }
  };

  function countUp() {
    var elapsedTime = moment().diff(startTime);
    callbacks.tick(elapsedTime);
    activeTimer = $timeout(tick, clockRefreshInterval);
  };

  function countDown() {
    var elapsedTime = Math.max(0, focusDuration - moment().diff(startTime));

    if (breakWarning && elapsedTime <= warningPeriod) {
      breakWarning = false;
      callbacks.warning();
    }

    if (elapsedTime == 0) {
      callbacks.end();
    } else {
      callbacks.tick(elapsedTime);
      activeTimer = $timeout(tick, clockRefreshInterval);
    }
  };


  this.up = function() {
    tick = countUp;
    start();
  };

  this.down = function() {
    tick = countDown;
    start();
  };

  this.stop = stop;
};

module.exports = function($timeout) {
  return function(callbacks) {
    return new Clock($timeout, callbacks);
  };
};
