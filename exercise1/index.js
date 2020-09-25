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
    this.event = document.createEvent('Event');
};

/*
 * Style - stylise the app
 * @return {Object} this
 */
GridGenerator.prototype._style = function() {
    var sheet = document.createElement('style');

    sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --white: #FFF; }';
    sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; }';
    sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
    sheet.innerHTML += '.matrix { margin: auto; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 1em; padding: 2em; }';
    sheet.innerHTML += '.matrix-cell { width: 1em; height: 1em; text-align: center; }';

    this.body.appendChild(sheet);

    return this;
}

/**
 * Init Matrix
 * @return {Object} this
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
    return this;
}

/**
 * Bind Event
 * @return {Object} this
 */
GridGenerator.prototype._bindEvent = function() {
    var cells = document.querySelectorAll('.matrix-cell');

    this.event.initEvent('changeColor', true, true);
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('changeColor', function(e) {
            this._changeCellColor(e.target);
        }.bind(this))
    }

    return this;
}

/**
 * Change Cell Color
 * @param {Object} this
 * @return {Object} this
 */
GridGenerator.prototype._changeCellColor = function(cell) {
    /*var cells = document.querySelectorAll('.matrix-cell');

    for (var i = 0; i < cells.length; i++) {*/
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        cell.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    /*}*/

    return this;
}

/**
 * Get Random MS - return a value between 1000 and 2000
 * @return {number} seconds
 */
GridGenerator.prototype._getRandomMS = function() {
    return Math.floor((Math.random() + 1) * 1000);
};

/**
 * Run
 * @return {Object} this
 */
GridGenerator.prototype.run = function() {
    var event = document.createEvent('Event');
    console.log(this._getRandomMS());

    this._style();
    this._createMatrix();
    this._bindEvent();

    var cells = document.querySelectorAll('.matrix-cell');

    setInterval(function() {
        cells[0].dispatchEvent(this.event)
    }.bind(this), 500);

    return this;
};

/* Test */
var matrixGen = new GridGenerator(20, 20);
matrixGen.run();
/* End test */
