'use strict'

var moment = require('moment');

var pad = function(number) {
  return number < 10 ? '0' + number : number;
};

module.exports = function() {
  return function(milliseconds) {
    var duration = moment.duration(milliseconds);
    return pad(duration.hours()) + ':' + pad(duration.minutes()) + ':' + pad(duration.seconds());
  };
};
