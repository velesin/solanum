var moment = require('moment');
var config = require('../config');

module.exports = function($scope, $timeout, nodeWebkit) {
  var focusMode = true;
  var breakWarning = false;
  var startTime;
  var focusDuration = moment.duration(config.focusDuration, 'minutes').asMilliseconds();
  var timeToBreak = focusDuration - moment.duration(config.warningPeriod, 'seconds').asMilliseconds();
  var timer;

  var pad = function(number) {
    return number < 10 ? '0' + number : number;
  };

  var updateTime = function updateTime() {
    var elapsedTime = moment().diff(startTime);

    if (breakWarning && elapsedTime >= timeToBreak) {
      breakWarning = false;
      nodeWebkit.breakWarning();
    }

    if (focusMode && elapsedTime >= focusDuration) {
      $scope.elapsedTime = '00:00:00';
      $scope.break();
    } else {
      var duration = moment.duration(elapsedTime);
      $scope.elapsedTime = pad(duration.hours()) + ':' + pad(duration.minutes()) + ':' + pad(duration.seconds());
      timer = $timeout(updateTime, 250);
    }
  };

  $scope.elapsedTime = '00:00:00';

  $scope.focus = function() {
    if (timer) {
      $timeout.cancel(timer);
    }
    focusMode = true;
    nodeWebkit.focus();
    startTime = moment();
    breakWarning = true;
    timer = $timeout(updateTime, 250);
  };

  $scope.break = function() {
    if (timer) {
      $timeout.cancel(timer);
    }
    focusMode = false;
    nodeWebkit.break();
    startTime = moment();
    timer = $timeout(updateTime, 250);
  };

  $scope.stop = function() {
    if (timer) {
      $timeout.cancel(timer);
    }
    $scope.elapsedTime = '00:00:00';
    focusMode = true;
    nodeWebkit.focus();
  };
};
