'use strict'

var moment = require('moment');
var config = require('../config');

function Clock($timeout, ticker, callbacks) {
  var focusDuration = moment.duration(config.focusDurationMinutes, 'minutes').asMilliseconds();
  var warningPeriod = moment.duration(config.warningPeriodSeconds, 'seconds').asMilliseconds();

  var startTime;
  var breakWarning;

  function start(callback) {
    startTime = moment();
    breakWarning = true;
    ticker.start(callback);
  };

  function stop() {
    ticker.stop();
  };

  function countUp() {
    var elapsedTime = moment().diff(startTime);
    callbacks.tick(elapsedTime);
  };

  function countDown() {
    var elapsedTime = Math.max(0, focusDuration - moment().diff(startTime));

    if (breakWarning && elapsedTime <= warningPeriod) {
      breakWarning = false;
      callbacks.warning();
    }

    if (elapsedTime == 0) {
      ticker.stop();
      callbacks.end();
    } else {
      callbacks.tick(elapsedTime);
    }
  };


  this.up = function() {
    start(countUp);
  };

  this.down = function() {
    start(countDown);
  };

  this.stop = stop;
};

module.exports = function($timeout, ticker) {
  return function(callbacks) {
    return new Clock($timeout, ticker, callbacks);
  };
};
