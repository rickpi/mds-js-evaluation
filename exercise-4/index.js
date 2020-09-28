/**
 * index.js
 */
'use strict';

/**
 * WorldMap
 * @constructor
 */
var WorldMap = function WorldMap() {
	this.map;
};

/**
 * Render World Map
 * @return {Object} this
 */
WorldMap.prototype.renderWorldMap = function() {
	console.log(svg);
	return this;
};

/* Test */
var worldMap = new WorldMap();
worldMap.renderWorldMap();
/* End test */