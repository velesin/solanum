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
