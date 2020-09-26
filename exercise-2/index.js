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
 * Change Percent
 * @param {number} newPercent
 * @return {Object} this
 */
DrawBar.prototype.changePercent = function(newPercent) {
	this.percent = newPercent;

	return this;
};

/**
 * Update
 * @return {Object} loadingBar - the updated bar
 */
DrawBar.prototype.update = function() {
	var segment = this.loadingBar.firstChild;

	segment.style.width = this._calculatePercent() + '%';
	segment.style.backgroundColor = this.color;
	return this.loadingBar;
};

/**
 * Run
 * @return {Object} bar
 */
DrawBar.prototype.run = function() {
	var bar = this._createBar();

	return bar;
};

/**
 * Testing
 */
function testing() {
	var container = document.createElement('div');
	var drawBar = new DrawBar(100, 0);
	var event = document.createEvent('Event');
	var loadingBar = drawBar.run();
	var sheet = document.createElement('style');

	sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --grey: #EEE; }';
	sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; }';
	sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
	sheet.innerHTML += '.container { margin: auto; width: 30em; height: 2em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--grey); border-radius: 0.6em; overflow: hidden; }';
	document.body.appendChild(sheet);
	container.classList.add('container');
	document.body.appendChild(container);
	container.appendChild(loadingBar);

	event.initEvent('stopLoading', true, true);
	var loading = setInterval(function() {
		drawBar.changePercent(drawBar.percent + 5);
		if (drawBar.percent >= 75) {
			drawBar.changeColor('#f6b93b');
		}

		if (drawBar.percent >= 95) {
			drawBar.changeColor('#e55039');
		}

		drawBar.update();
		if (drawBar.percent === drawBar.sum) {
			loadingBar.dispatchEvent(event);
		}

	}, 500);

	loadingBar.addEventListener('stopLoading', function() {
		clearInterval(loading);
	});
}

testing();