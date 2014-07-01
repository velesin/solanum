'use strict'

var primaryWindow;
var secondaryWindow;
var warningWindow;
var tray;
var visible = false;

var focusMode = function() {
  secondaryWindow.leaveKioskMode();
  secondaryWindow.hide();

  primaryWindow.leaveKioskMode();
  primaryWindow.hide();

  warningWindow.hide();

  visible = false;
};

var breakMode = function() {
  warningWindow.hide();
  secondaryWindow.enterKioskMode();
  primaryWindow.enterKioskMode();
};

var showWarning = function() {
  warningWindow.show();
};

var toggleTray = function() {
  if (primaryWindow.isKioskMode) { return; }

  visible ? primaryWindow.hide() : primaryWindow.show();
  visible = !visible;
};

var createApp = function(gui) {
  primaryWindow = gui.Window.get();

  secondaryWindow = gui.Window.open('blank.html', {
    x: window.screen.width,
    y: window.screen.height,
    'always-on-top': true,
    frame: false,
    resizable: false,
    toolbar: false,
    show: false
  });

  warningWindow = gui.Window.open('warning.html', {
    x: window.screen.width - 200,
    y: window.screen.height - 80,
    width: 160,
    height: 40,
    'always-on-top': true,
    frame: false,
    resizable: false,
    toolbar: false,
    show: false
  });

  tray = new gui.Tray({
    tooltip: 'NW Timer',
    icon: 'assets/tomato.png'
  });

  tray.on('click', toggleTray);
};

module.exports = {
  start: createApp,
  break: breakMode,
  focus: focusMode,
  breakWarning: showWarning
};
