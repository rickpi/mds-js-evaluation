'use strict'

/**
 * Form
 * @constructor
 */
var Form = function Form(form) {
	this.form = form;
	this.inputs = form.querySelectorAll('input');
};

/**
 * Run
 * @return {Object} this
 */
Form.prototype.run = function() {
	this._bindEvents();
	return this;
};

/**
 * Bind Events
 * @return {Object} this
 */
Form.prototype._bindEvents = function() {
	this.inputs.forEach(function(input) {
		input.addEventListener('focus', function(event) {
			var parentNode = event.target.parentNode;
			var placeholder = parentNode.querySelector('.input-placeholder');

			event.target.placeholder = '';
			placeholder.style.opacity = '1';
			placeholder.style.visibility = 'visible';
		}.bind(this));
		input.addEventListener('blur', function(event) {
			var parentNode = event.target.parentNode;
			var placeholder = parentNode.querySelector('.input-placeholder');

			if (!event.target.value) {
				event.target.placeholder = placeholder.textContent;
				placeholder.style.opacity = '0';
				placeholder.style.visibility = 'hidden';
			}

		}.bind(this));
		input.addEventListener('input', function(event) {
			var parentNode = event.target.parentNode;
			var placeholder = parentNode.querySelector('.input-placeholder');

			if (event.target.value) {
				placeholder.style.fontSize = '0.7em';
				placeholder.style.transform = 'translateY(0)';
			}

			if (!event.target.value) {
				placeholder.style.fontSize = '1em';
				placeholder.style.transform = 'translateY(-185%)';
			}

		}.bind(this));
	})
	return this;
};

/* Test */
var element = document.querySelector('form');
var form = new Form(element);
form.run();
/* End Test */