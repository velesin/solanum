'use strict'

var $timeout = require('./fake_timeout');

var tickerFactory = require('../app/ticker_service');
var ticker;

describe('Ticker', function() {
  var callback;

  beforeEach(function() {
    $timeout.reset();
    callback = sinon.spy();
    ticker = tickerFactory($timeout);
  });

  describe('start', function() {
    beforeEach(function() {
      ticker.start(callback);
    });

    it('invokes the provided callback immediately', function() {
      expect(callback).to.have.been.called;
    });

    it('invokes the callback after the timeout passes', function() {
      callback.reset();

      $timeout.fire();

      expect(callback).to.have.been.called;
    });

    it('invokes the callback continuously', function() {
      callback.reset();

      $timeout.fire();
      $timeout.fire();

      expect(callback).to.have.been.calledTwice;
    });

    it('allows to restart the Ticker with a different callback', function() {
      var newCallback = sinon.spy();

      callback.reset();
      ticker.start(newCallback);

      expect(callback).to.not.have.been.called;
      expect(newCallback).to.have.been.calledOnce;

      newCallback.reset();
      $timeout.fire();

      expect(callback).to.not.have.been.called;
      expect(newCallback).to.have.been.calledOnce;
    })
  });

  describe('stop', function() {
    beforeEach(function() {
      ticker.start(callback);
      callback.reset();
    });

    it('prevents the callback from further firing', function() {
      ticker.stop();

      $timeout.fire();

      expect(callback).to.not.have.been.called;
    });
  });
});
