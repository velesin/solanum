'use strict'

module.exports = function($scope, nodeWebkit, clock) {
  var timer = clock({
    tick: function(elapsedTime) {
      $scope.elapsedTime = elapsedTime;
    },
    warning: function() {
      nodeWebkit.breakWarning();
    },
    end: function() {
      $scope.break();
    }
  });


  $scope.elapsedTime = 0;

  $scope.focus = function() {
    timer.down();
    nodeWebkit.focus();
  };

  $scope.break = function() {
    timer.up();
    nodeWebkit.break();
  };

  $scope.stop = function() {
    timer.stop();
    $scope.elapsedTime = 0;
    nodeWebkit.focus();
  };
};
