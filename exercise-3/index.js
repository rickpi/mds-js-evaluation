/**
 * index.js
 */
'use strict';

/**
 * MyMorpionXO
 * @constructor
 */
var MyMorpionXO = function MyMorpionXO() {
	this.xPoints = 0;
	this.oPoints = 0;
	this.board;
};

/**
 * Style
 * @return {Object} this
 */
MyMorpionXO.prototype._style = function() {
	var sheet = document.createElement('style');

	sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --white: #FFF; }';
	sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; }';
	sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
	sheet.innerHTML += '.container { margin: auto; width: 30em; height: 30em; padding: 2em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 0.6em; }';
	document.body.appendChild(sheet);
	return this;
};

/**
 * Run
 * @return {Object} this
 */
MyMorpionXO.prototype.run = function() {
	this._style();
	return this;
};

var morpion = new MyMorpionXO();
morpion.run();