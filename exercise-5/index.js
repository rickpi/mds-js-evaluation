'use strict'

/**
 * Form
 * @constructor
 */
var Form = function Form(form) {
	this.form = form;
	this.inputs = form.querySelectorAll('input');
	this.submit = form.querySelector('button');
	this.isValid = true;
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
			this._handleFocus(event.target);
		}.bind(this));
		input.addEventListener('blur', function(event) {
			this._handleBlur(event.target);
		}.bind(this));
		input.addEventListener('input', function(event) {
			this._handleInput(event.target);
		}.bind(this));
	}.bind(this));
	this.form.addEventListener('submit', function(event) {
		this._handleSubmit(event);
	}.bind(this));
	return this;
};

/**
 * Handle Focus
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._handleFocus = function(input) {
	var parentNode = input.parentNode;
	var placeholder = parentNode.querySelector('.input-placeholder');

	input.classList.remove('error');
	input.placeholder = '';
	placeholder.style.opacity = '1';
	placeholder.style.visibility = 'visible';
	return this;
};

/**
 * Handle Blur
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._handleBlur = function(input) {
	var parentNode = input.parentNode;
	var placeholder = parentNode.querySelector('.input-placeholder');
	var error = parentNode.querySelector('.input-error');

	error.textContent = '';
	if (!event.target.value) {
		input.placeholder = placeholder.textContent;
		input.classList.add('error');
		placeholder.style.opacity = '0';
		placeholder.style.visibility = 'hidden';
		error.textContent = "Ce champ est requis";
	}

	return this;
};

/**
 * Handle Input
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._handleInput = function(input) {
	var parentNode = input.parentNode;
	var placeholder = parentNode.querySelector('.input-placeholder');

	if (input.value) {
		placeholder.style.fontSize = '0.7em';
		placeholder.style.transform = 'translateY(0)';
	}

	if (!input.value) {
		placeholder.style.fontSize = '1em';
		placeholder.style.transform = 'translateY(-185%)';
	}

	return this;
};

/**
 * Handle Submit
 * @param {Object} event
 * @return {Object} this
 */
Form.prototype._handleSubmit = function(event) {
	event.preventDefault();
	this.isValid = true;
	this.inputs.forEach(function(input) {
		var parentNode = input.parentNode;

		parentNode.querySelector('.input-error').textContent = '';
	}.bind(this));
	this._checkEmptyFields();
	this._checkInputsValue();

	if (this.isValid) {
		event.target.submit();
	}

	return this;
};

/**
 * Check Empty Fields
 * @return {Object} this
 */
Form.prototype._checkEmptyFields = function() {
	this.inputs.forEach(function(input) {
		if (!input.value) {
			this._handleError(input, 'Ce champ est requis');
		}
	}.bind(this));
	return this;
};

/**
 * Check Empty Fields
 * @return {Object} this
 */
Form.prototype._checkInputsValue = function() {
	this.inputs.forEach(function(input) {
		switch (input.type) {
			case 'text':
			this._checkInputText(input);
			break;
			case 'password':
			this._checkInputPassword(input);
			break;
		}
	}.bind(this));
	return this;
};

/**
 * Check Input Text
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._checkInputText = function(input) {
	var search = input.value.search(/[^a-z\-À-ÿ ]/gi);

	if (input.name === 'email') {
		return this._checkInputEmail(input);
	}

	if (search >= 0) {
		this._handleError(input, 'Champ invalide');
	}

	return this;
};

/**
 * Check Input Email
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._checkInputEmail = function(input) {
	var search = input.value.search(/^\S+@\S+\.\S+$/gi);

	if (search < 0) {
		this._handleError(input, 'Email invalide');
	}

	return this;
};

/**
 * Check Input Password
 * @param {Object} input
 * @return {Object} this
 */
Form.prototype._checkInputPassword = function(input) {
	var search = input.value.search(/[ ]/gi);

	if (search >= 0) {
		this._handleError(input, 'Password invalide');
	}

	return this;
};

/**
 * Handle Error
 * @param {Object} input
 * @param {String} message
 * @return {Object} this
 */
Form.prototype._handleError = function(input, message) {
	var parentNode = input.parentNode;

	this.isValid = false;
	parentNode.querySelector('.input-error').textContent = message;
	input.classList.add('error');
	return this;
};

/* Test */
var element = document.querySelector('form');
var form = new Form(element);
form.run();
/* End Test */