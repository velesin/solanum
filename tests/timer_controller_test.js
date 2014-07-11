'use strict'

var controller = require('../app/timer_controller');

var $scope;
var nodeWebkit;
var timerCallbacks;
var timer;

var itStartsBreak = function() {
  it('starts the clock, counting up', function() {
    expect(timer.up).to.have.been.called;
  });

  it('blocks the screen', function() {
    expect(nodeWebkit.break).to.have.been.called;
  });
};

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

  it('initially shows zeroed time', function() {
    expect($scope.elapsedTime).to.equal(0);
  });

  describe('focus handler', function() {
    beforeEach(function() {
      $scope.focus();
    });

    it('starts the clock, counting down', function() {
      expect(timer.down).to.have.been.called;
    });

    it('hides the app window', function() {
      expect(nodeWebkit.focus).to.have.been.called;
    });
  });

  describe('break handler', function() {
    beforeEach(function() {
      $scope.break();
    });

    itStartsBreak();
  });

  describe('stop handler', function() {
    beforeEach(function() {
      $scope.stop();
    });

    it('stops the clock', function() {
      expect(timer.stop).to.have.been.called;
    });

    it('hides the app window', function() {
      expect(nodeWebkit.focus).to.have.been.called;
    });

    it('zeroes the time', function() {
      expect($scope.elapsedTime).to.equal(0);
    });
  });

  describe('tick callback handler', function() {
    var elapsedTime = 123;

    beforeEach(function() {
      timerCallbacks.tick(elapsedTime);
    });

    it('updates elapsed time', function() {
      expect($scope.elapsedTime).to.equal(elapsedTime);
    });
  });

  describe('break warning callback handler', function() {
    beforeEach(function() {
      timerCallbacks.warning();
    });

    it('displays incoming break warning window', function() {
      expect(nodeWebkit.breakWarning).to.have.been.called;
    });
  });

  describe('end callback handler', function() {
    beforeEach(function() {
      timerCallbacks.end();
    });

    itStartsBreak();
  });
});
