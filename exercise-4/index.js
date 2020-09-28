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
	this.selected = null;
};

/**
 * Render World Map
 * @return {Object} this
 */
WorldMap.prototype.renderWorldMap = function() {
	this._initMap();
	this._bindEvents();
	return this;
};

/**
 * Init Map
 * @return {Object} this
 */
WorldMap.prototype._initMap = function() {
	var caption = document.createElement('div');

	document.body.innerHTML += SVG_MODEL;
	this.map = document.querySelector('svg');
	this.map.classList.add('world-map');
	caption.classList.add('caption');
	document.body.appendChild(caption);
};

/**
 * Bind Events
 * @return {Object} this
 */
WorldMap.prototype._bindEvents = function() {
	var countries = this.map.querySelectorAll('path');

	for (var i = 0; i < countries.length; i++) {
		countries[i].addEventListener('mouseenter', function(e) {
			var country = e.target;

			if (country.id !== this.selected) {
				country.style.fill = '#00F';	
			}
		});
		countries[i].addEventListener('mouseleave', function(e) {
			var country = e.target;

			if (country.id !== this.selected) {
				country.style.fill = '#000';	
			}
		});
		countries[i].addEventListener('click', function(e) {
			var country = e.target;

			if (country.id !== this.selected) {
				this.selected = country.id;
				country.style.fill = '#F00';
				return ;
			}

			this.selected = null;
			country.style.fill = '#000'
		});
	}

	return this;
};

/* Test */
var worldMap = new WorldMap();
worldMap.renderWorldMap();
/* End test */