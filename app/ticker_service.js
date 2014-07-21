'use strict'

function Ticker($timeout) {
  var _callback;
  var timer;

  function tick() {
    _callback();
    timer = $timeout(tick, 250);
  };

  this.start = function(callback) {
    this.stop();
    _callback = callback;
    tick();
  };

  this.stop = function() {
    $timeout.cancel(timer);
  };
}

module.exports = function($timeout) {
  return new Ticker($timeout);
};
