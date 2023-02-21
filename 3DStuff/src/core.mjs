import * as vertexBuffer from "./vertex_buffer.mjs";
import * as simpleShader from "./shader_support.mjs";

let gl = null;
export function getGL() {
  return gl;
}

export function initWebGL(canvasID) {
  let canvas = document.getElementById(canvasID);
  gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  gl.clearColor(0.0, 0.8, 0.0, 1.0);

  vertexBuffer.init();
  simpleShader.init("VertexShader", "FragmentShader");
}

export function drawSquare() {
  simpleShader.activate();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function clearCanvas() {
  let gl = getGL();
  gl.clear(gl.COLOR_BUFFER_BIT);
}