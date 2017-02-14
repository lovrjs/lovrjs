var OVRUI = require('ovrui');
var THREE = require('three');
var deepAssign = require('deep-assign');

function Lovr () {
}

Lovr.prototype.graphics = {};

Lovr.prototype.graphics.cube = function (mode, x, y, z, size) {
  if (mode === 'line') {
    // Build a single UX panel.
    var helloUIView = new OVRUI.UIView(lovr._guiSys);
    // lovr._guiSys.loadFont();
    // helloUIView.setResizeMode('contain');
    helloUIView.setFrame(0, 0, 2, 1);
    helloUIView.setLocalPosition([x, y, z]);
    helloUIView.setIsInteractable(false);
    helloUIView.setText('poop');
    // lovr._guiSys.add(helloUIView);

    var cube = new THREE.BoxBufferGeometry(size, size, size);
    lovr._guisys.add(cube);
  } else {
    console.warn('Unsupported draw mode "%s" for `lovr.graphics.cube`', mode);
  }
};

var lovr = new Lovr();

function initScene (player, scene, guiSys) {
  // Initial Scene setup.
  if (lovr.load) {
    lovr.load();
  }

  // Build a single UX panel.
  var helloUIView = new OVRUI.UIView(guiSys);
  // guiSys.loadFont();
  // helloUIView.setResizeMode('contain');
  helloUIView.setFrame(0, 0, 2, 1);
  helloUIView.setLocalPosition([-1, 1, -5]);
  helloUIView.setIsInteractable(false);
  helloUIView.setText('Hello');
  guiSys.add(helloUIView);
  return helloUIView;
}

window.addEventListener('load', function () {
  var player = new OVRUI.Player({
    elementOrId: document.body
  });

  // The THREE.js scene is the basis for holding the OVRUI GUI.
  // For the GUI, configure a user-friendly, auto-hiding cursor.
  var scene = new THREE.Scene();

  var guiSys = new OVRUI.GuiSys(scene, {
    // cursorEnabled: true,
    // cursorAutoHide: true,
    // font: 'default'
  });

  lovr._player = player;
  lovr._scene = scene;
  lovr._guiSys = guiSys;

  initScene(player, scene, guiSys);

  var render = function () {
    player.requestAnimationFrame(render);

    // We have to advance the input frame.
    player.frame();

    // Passing a `glRenderer` enables mouse events to work when on a desktop browser.
    guiSys.frame(player.camera, player.glRenderer);

    // This is the frame-advance function where we can do animations.
    //frame();
    if (lovr.update) {
      lovr.update();
    }

    // Have the player render the current scene state.
    player.render(scene);
    if (lovr.draw) {
      lovr.draw();
    }
  };

  player.requestAnimationFrame(render);
});

if (window) {
  window.lovr = lovr;
}

exports.lovr = lovr;
