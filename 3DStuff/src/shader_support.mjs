"use strict";

import * as core from "./core.mjs";
import * as vertexBuffer from "./vertex_buffer.mjs";

let mCompiledShader = null;
let mVertexPositionRef = null;

function loadAndCompileShader(id, shaderType) {
  let shaderSource = null, compiledShader = null;
  let shaderText = document.getElementById(id);
  let gl = core.getGL();

  shaderSource = shaderText.firstChild.textContent;
  compiledShader = gl.createShader(shaderType);

  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error("Error compiling shader: " + gl.getShaderInfoLog(compiledShader));
  }

  return compiledShader;
}

export function init(vertexShaderID, fragmentShaderID) {
  let gl = core.getGL();

  let vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  let fragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);
  mCompiledShader = gl.createProgram();
  gl.attachShader(mCompiledShader, vertexShader);
  gl.attachShader(mCompiledShader, fragmentShader);
  gl.linkProgram(mCompiledShader);
  
  if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
    throw new Error("Error linking shader: " + gl.getProgramInfoLog(mCompiledShader));
  }

  mVertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}

export function activate() {
  let gl = core.getGL();
  gl.useProgram(mCompiledShader);
  gl.enableVertexAttribArray(mVertexPositionRef);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(mVertexPositionRef);
}