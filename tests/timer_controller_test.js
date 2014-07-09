'use strict'

var controller = require('../app/timer_controller.js');

var $scope;
var nodeWebkit;
var timerCallbacks;
var timer;

describe('TimerController', function() {
  beforeEach(function() {
    $scope = {};
    nodeWebkit = {
      focus: sinon.spy(),
      break: sinon.spy(),
      breakWarning: sinon.spy()
    };
    timer = {
      up: sinon.spy(),
      down: sinon.spy(),
      stop: sinon.spy()
    };

    controller($scope, nodeWebkit, function(callbacks) {
      timerCallbacks = callbacks;
      return timer;
    });
  });
});
