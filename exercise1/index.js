/**
 * index.js
 */
'use strict';

/**
 * Matrix Generator
 * @constructor
 * @param {number} xAxis
 * @param {number} yAxis
 */
var MatrixGenerator = function MatrixGenerator(xAxis, yAxis) {
    this.invalid = typeof this.xAxis !== 'number' ||
                typeof this.yAxis !== 'number' ||
                this.xAxis <= 0 ||
                this.yAxis <= 0;
    this.matrix = [];
    this.matrixContainer = document.querySelector('body');
    this.xAxis = xAxis;
    this.yAxis = yAxis;
};
