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
			this._hoverCountry(e.target, '#00F');
		}.bind(this));
		countries[i].addEventListener('mouseleave', function(e) {
			this._hoverCountry(e.target, '#000');
		}.bind(this));
		countries[i].addEventListener('click', function(e) {
			this._clickCountry(e.target);
			this._updateCaption();
		}.bind(this));
	}

	return this;
};

/**
 * Hover Country
 * @param {Object} country
 * @param {string} color
 * @return {Object} this
 */
WorldMap.prototype._hoverCountry = function(country, color) {
	if (country.id !== this.selected) {
		country.style.fill = color;	
	}

	return this;
};

/**
 * Click Country
 * @param {Object} country
 * @return {Object} this
 */
WorldMap.prototype._clickCountry = function(country) {
	console.log(country.id);
	var selected = this.map.querySelector('#' + this.selected);

	if (country.id !== this.selected) {
		if (selected) {
			selected.style.fill = '#000';
		}

		this.selected = country.id;
		country.style.fill = '#F00';
		return this;
	}

	this.selected = null;
	country.style.fill = '#000';
	return this;
};

/**
 * Update Caption
 * @return {Object} this
 */
 orldMap.prototype._updateCaption = function() {
 	var caption = document.querySelector('.caption');
 	var captionList = document.createElement('ul');
 	var listItem = document.createElement('li');

 	caption.innerHTML = '';
 	if (this.selected) {
 		var country = this.map.querySelector('#' + this.selected);
 		var countryName = country.id;

 		listItem.textContent = this._formatCountryName(countryName);/*
 		var firstLetter = countryName.charAt(0).toUpperCase();

 		countryName = firstLetter + countryName.slice(1);
 		listItem.textContent = countryName;*/
 		captionList.appendChild(listItem);
 		caption.appendChild(captionList);
 	}
};

/**
 * Format Country Name
 * @param {string} country
 * @return {string} countryName
 */
WorldMap.prototype._formatCountryName = function(country) {
 	var countryTab = country.split('-');
 	var countryTabUppered = countryTab.map(function(item) {
 		var firstLetter = item.charAt(0).toUpperCase();

 		return firstLetter + item.slice(1);
 	});

 	return countryTabUppered.join(' ');
}

/* Test */
var worldMap = new WorldMap();
worldMap.renderWorldMap();
/* End test */