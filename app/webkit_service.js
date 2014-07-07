'use strict'

var primaryWindow;
var secondaryWindow;
var warningWindow;
var tray;
var visible = false;

function focusMode() {
  secondaryWindow.leaveKioskMode();
  secondaryWindow.hide();

  primaryWindow.leaveKioskMode();
  primaryWindow.hide();

  warningWindow.hide();

  visible = false;
};

function breakMode() {
  warningWindow.hide();
  secondaryWindow.enterKioskMode();
  primaryWindow.enterKioskMode();
};

function showWarning() {
  warningWindow.show();
};

function toggleTray() {
  if (primaryWindow.isKioskMode) { return; }

  visible ? primaryWindow.hide() : primaryWindow.show();
  visible = !visible;
};

function createApp(gui) {
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

  var warningWindowWidth = 160;
  var warningWindowHeight = 40;
  var warningWindowMargin = 40;
  warningWindow = gui.Window.open('warning.html', {
    width: warningWindowWidth,
    height: warningWindowHeight,
    x: window.screen.width - warningWindowWidth - warningWindowMargin,
    y: window.screen.height - warningWindowHeight - warningWindowMargin,
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
