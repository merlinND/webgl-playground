'use strict';

/**
 * Get the WebGL context from the `canvas` element
 */
var getContext = function(canvasId) {
  var canvas = document.getElementById(canvasId);
  return canvas.getContext('experimental-webgl');
}

var setupProgram = function(gl, vertexShader, fragmentShader) {
  var program = createProgramFromScripts(gl, [vertexShader, fragmentShader]);
  gl.useProgram(program);
  return program;
}

// Allocate and fill a GL buffer with vertices
var makeTrianglesBuffer = function(gl, coordinates, attribute) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(coordinates),
      gl.STATIC_DRAW
    );

  var nTriangles = (coordinates.length / 6);

  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, nTriangles, gl.FLOAT, false, 0, 0);

  return buffer;
}

var main = function() {
  var gl = getContext('canvas');
  var program = setupProgram(gl, '2d-vertex-shader', '2d-fragment-shader');

  var positionAttribute = gl.getAttribLocation(program, 'a_position');
  var verticesCoordinates = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0
    ];
  makeTrianglesBuffer(gl, verticesCoordinates, positionAttribute);

  // Draw triangles
  gl.drawArrays(gl.TRIANGLES, 0, verticesCoordinates.length / 2);
}

main();
