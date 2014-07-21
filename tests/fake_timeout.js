'use strict'

var timeouts;
var timeoutCounter;

function fakeTimeout(callback) {
  timeouts[++timeoutCounter] = callback;
  return timeoutCounter;
};

fakeTimeout.cancel = function(id) {
  delete timeouts[id];
};

fakeTimeout.reset = function() {
  timeouts = [];
  timeoutCounter = 0;
};

fakeTimeout.fire = function() {
  var timeoutsToCall = timeouts;
  timeouts = [];

  timeoutsToCall.forEach(function(callback) {
    callback();
  });
};

module.exports = fakeTimeout;
