"use strict";

import * as core from "./core.mjs";

let mGLVertexBuffers = null;
export function get() {
  return mGLVertexBuffers;
}

let mVerticesOfSquare = new Float32Array([
  -0.5, 0.5, 0.0,
  -0.5, -0.5, 0.0,
  0.5, -0.5, 0.0,
  0.5, 0.5, 0.0
]);

export function init() {
  let gl = core.getGL();

  mGLVertexBuffers = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffers);
  gl.bufferData(gl.ARRAY_BUFFER, mVerticesOfSquare, gl.STATIC_DRAW);
}
