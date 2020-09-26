/**
 * index.js
 */
'use strict';

/**
 * Draw Bar
 * @constructor
 * @param {number} sum
 * @param {number} percent
 */
var DrawBar = function DrawBar(sum, percent) {
    this.sum = sum;
    this.percent = percent;
    this.color = '#9FD17A';
    this.loadingBar;
};

/**
 * Calculate Percent
 * @return {number} calculatedPercent
 */
DrawBar.prototype._calculatePercent = function() {
	return Math.floor((this.percent * 100) / this.sum);
};

/**
 * Create Bar
 * @return {Object} loadingBar
 */
DrawBar.prototype._createBar = function() {
	var loadingBar = document.createElement('div');
	var segment = document.createElement('div');

	loadingBar.style.width ='100%';
	loadingBar.style.height = '100%';
	segment.style.width = this._calculatePercent() + '%';
	segment.style.height = '100%';
	segment.style.backgroundColor = this.color;
	loadingBar.appendChild(segment);
	this.loadingBar = loadingBar;
	return loadingBar;
};

/**
 * Change Color
 * @param {string} newColor
 * @return {Object} this
 */
DrawBar.prototype.changeColor = function(newColor) {
	this.color = newColor;

	return this;
};

/**
 * Run
 * @return {Object} bar
 */
DrawBar.prototype.run = function() {
	var bar = this._createBar();

	return bar;
};

/* Test */
var drawBar = new DrawBar(50, 20);
var container = document.createElement('div');
var sheet = document.createElement('style');
var loadingBar = drawBar.run();

sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --grey: #EEE; }';
sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; }';
sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
sheet.innerHTML += '.container { margin: auto; width: 30em; height: 2em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--grey); border-radius: 0.6em; overflow: hidden; }';
document.body.appendChild(sheet);
container.classList.add('container');
document.body.appendChild(container);
container.appendChild(loadingBar);
drawBar.changeColor('#e55039');
/* End test */
