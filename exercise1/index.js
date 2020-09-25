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

/**
 * Init Matrix
 */
MatrixGenerator.prototype._initMatrix = function() {
    for (var i = 0; i < this.yAxis; i++) {
        var row = [];

        for (var j = 0; j < this.xAxis; j++) {
            row.push('');
        }

        this.matrix.push(row);
    }
}

/* Test */
var matrixGen = new MatrixGenerator(10, 10);
matrixGen._initMatrix();
console.log(matrixGen.matrix);
/* End test */
