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
 * Run
 * @return {Object} this
 */
MyMorpionXO.prototype.run = function() {
	console.log('run');
	return this;
};

var morpion = new MyMorpionXO();
morpion.run();