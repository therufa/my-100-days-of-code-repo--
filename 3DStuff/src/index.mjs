"use strict";

import * as core from "./core.mjs";

window.onload = function () {
  core.initWebGL("canvas");
  core.clearCanvas();
  core.drawSquare();
}
