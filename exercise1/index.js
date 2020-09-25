/**
 * index.js
 */
'use strict';

/**
 * Grid Generator
 * @constructor
 * @param {number} xAxis
 * @param {number} yAxis
 */
var GridGenerator = function GridGenerator(xAxis, yAxis) {
    this.invalid = typeof this.xAxis !== 'number' ||
                typeof this.yAxis !== 'number' ||
                this.xAxis <= 0 ||
                this.yAxis <= 0;
    this.body = document.querySelector('body');
    this.xAxis = xAxis;
    this.yAxis = yAxis;
};

/*
 * Style - stylise the app
 */
GridGenerator.prototype._style = function() {
    var sheet = document.createElement('style');

    sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --white: #FFF; }';
    sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; }';
    sheet.innerHTML += 'html { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
    sheet.innerHTML += '.matrix-container { margin: auto; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 1em; padding: 2em; }';
    sheet.innerHTML += '.matrix-cell { width: 1em; height: 1em; text-align: center; }';

    this.body.appendChild(sheet);
    console.log(sheet);
}

/**
 * Init Matrix
 */
GridGenerator.prototype._createMatrix = function() {
    var table = document.createElement('table');

    table.classList.add('matrix');
    for (var i = 0; i < this.yAxis; i++) {
        var tr = document.createElement('tr');

        tr.classList.add('matrix-row');
        table.appendChild(tr);
        for (var j = 0; j < this.xAxis; j++) {
            var td = document.createElement('td');

            td.classList.add('matrix-cell');
            tr.appendChild(td);
        }
    }

    this.body.appendChild(table);
}

/**
 * Run
 */
GridGenerator.prototype.run = function() {
    this._style();
    this._createMatrix();
};

/* Test */
var matrixGen = new GridGenerator(10, 10);
matrixGen.run();
console.log(matrixGen.matrix);
/* End test */
