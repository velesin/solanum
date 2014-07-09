'use strict'

var filter = require('../app/as_clock_filter.js')();

var secondInMsec = 1000;
var minuteInMsec = secondInMsec * 60;
var hourInMsec = minuteInMsec * 60;

function timeInMsec(hours, minutes, seconds) {
  return hourInMsec * hours + minuteInMsec * minutes + secondInMsec * seconds;
};

describe('asClockFilter', function() {
  it('formats time correctly for two digit h, m and s', function() {
    expect(filter(timeInMsec(11, 22, 33))).to.equal('11:22:33');
  });
});
