'use strict'

var filter = require('../app/as_clock_filter')();

var secondInMsec = 1000;
var minuteInMsec = secondInMsec * 60;
var hourInMsec = minuteInMsec * 60;

function timeInMsec(hours, minutes, seconds) {
  return hourInMsec * hours + minuteInMsec * minutes + secondInMsec * seconds;
};

describe('asClockFilter', function() {
  it('formats time correctly for two digit h, m and s', function() {
    expect(filter(timeInMsec(12, 34, 56))).to.equal('12:34:56');
  });

  it('formats time correctly for single digit h, m and s', function() {
    expect(filter(timeInMsec(1, 2, 3))).to.equal('01:02:03');
  });

  it('formats time correctly for no h, m and s', function() {
    expect(filter(0)).to.equal('00:00:00');
  });

  it('rounds the time down to a full second', function() {
    expect(filter(secondInMsec + 123)).to.equal('00:00:01');
  });
});
