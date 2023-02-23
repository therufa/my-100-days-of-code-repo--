"use strict";
(() => {
  // src/vertex_buffer.mjs
  var mGLVertexBuffers = null;
  function get() {
    return mGLVertexBuffers;
  }
  var mVerticesOfSquare = new Float32Array([
    -0.8,
    0.5,
    0,
    0,
    0.8,
    0,
    0.1,
    -0.4,
    0,
    0.5,
    0.5,
    0
  ]);
  function init() {
    let gl2 = getGL();
    mGLVertexBuffers = gl2.createBuffer();
    gl2.bindBuffer(gl2.ARRAY_BUFFER, mGLVertexBuffers);
    gl2.bufferData(gl2.ARRAY_BUFFER, mVerticesOfSquare, gl2.STATIC_DRAW);
  }

  // src/shader_support.mjs
  var mCompiledShader = null;
  var mVertexPositionRef = null;
  function loadAndCompileShader(id, shaderType) {
    let shaderSource = null, compiledShader = null;
    let shaderText = document.getElementById(id);
    let gl2 = getGL();
    shaderSource = shaderText.firstChild.textContent;
    compiledShader = gl2.createShader(shaderType);
    gl2.shaderSource(compiledShader, shaderSource);
    gl2.compileShader(compiledShader);
    if (!gl2.getShaderParameter(compiledShader, gl2.COMPILE_STATUS)) {
      throw new Error("Error compiling shader: " + gl2.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
  }
  function init2(vertexShaderID, fragmentShaderID) {
    let gl2 = getGL();
    let vertexShader = loadAndCompileShader(vertexShaderID, gl2.VERTEX_SHADER);
    let fragmentShader = loadAndCompileShader(fragmentShaderID, gl2.FRAGMENT_SHADER);
    mCompiledShader = gl2.createProgram();
    gl2.attachShader(mCompiledShader, vertexShader);
    gl2.attachShader(mCompiledShader, fragmentShader);
    gl2.linkProgram(mCompiledShader);
    if (!gl2.getProgramParameter(mCompiledShader, gl2.LINK_STATUS)) {
      throw new Error("Error linking shader: " + gl2.getProgramInfoLog(mCompiledShader));
    }
    mVertexPositionRef = gl2.getAttribLocation(mCompiledShader, "aVertexPosition");
  }
  function activate() {
    let gl2 = getGL();
    gl2.useProgram(mCompiledShader);
    gl2.enableVertexAttribArray(mVertexPositionRef);
    gl2.bindBuffer(gl2.ARRAY_BUFFER, get());
    gl2.vertexAttribPointer(mVertexPositionRef, 3, gl2.FLOAT, false, 0, 0);
    gl2.enableVertexAttribArray(mVertexPositionRef);
  }

  // src/core.mjs
  var gl = null;
  function getGL() {
    return gl;
  }
  function initWebGL(canvasID) {
    let canvas = document.getElementById(canvasID);
    gl = canvas.getContext("webgl2");
    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }
    gl.clearColor(0, 0.8, 0, 1);
    init();
    init2("VertexShader", "FragmentShader");
  }
  function drawSquare() {
    activate();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  function clearCanvas() {
    let gl2 = getGL();
    gl2.clear(gl2.COLOR_BUFFER_BIT);
  }

  // src/index.mjs
  window.onload = function() {
    initWebGL("canvas");
    clearCanvas();
    drawSquare();
  };
})();
