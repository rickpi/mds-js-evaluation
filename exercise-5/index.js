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
			var parentNode = event.target.parentNode;
			var placeholder = parentNode.querySelector('.input-placeholder');

			event.target.classList.remove('error');
			event.target.placeholder = '';
			placeholder.style.opacity = '1';
			placeholder.style.visibility = 'visible';
		}.bind(this));
		input.addEventListener('blur', function(event) {
			var parentNode = event.target.parentNode;
			var placeholder = parentNode.querySelector('.input-placeholder');
			var error = parentNode.querySelector('.input-error');

			error.textContent = '';
			if (!event.target.value) {
				event.target.placeholder = placeholder.textContent;
				event.target.classList.add('error');
				placeholder.style.opacity = '0';
				placeholder.style.visibility = 'hidden';
				error.textContent = "Ce champ est requis";
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
	});
	this.form.addEventListener('submit', function(event) {
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

	}.bind(this));
	return this;
};

/**
 * Check Empty Fields
 * @return {Object} this
 */
Form.prototype._checkEmptyFields = function() {
	this.inputs.forEach(function(input) {
		var parentNode = input.parentNode;

		if (!input.value) {
			this.isValid = false;
			parentNode.querySelector('.input-error').textContent = 'Ce champ est requis';
			input.classList.add('error');
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
	var parentNode = input.parentNode;

	if (input.name === 'email') {
		return this._checkInputEmail(input);
	}

	if (search >= 0) {
		this.isValid = false;
		parentNode.querySelector('.input-error').textContent = 'Champ invalide';
		input.classList.add('error');
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
	var parentNode = input.parentNode;

	if (search < 0) {
		this.isValid = false;
		parentNode.querySelector('.input-error').textContent = 'Email invalide';
		input.classList.add('error');
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
	console.log(search);
	var parentNode = input.parentNode;

	if (search >= 0) {
		this.isValid = false;
		parentNode.querySelector('.input-error').textContent = 'Password invalide';
		input.classList.add('error');
	}

	return this;
};

/* Test */
var element = document.querySelector('form');
var form = new Form(element);
form.run();
/* End Test */