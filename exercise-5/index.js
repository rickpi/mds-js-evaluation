'use strict'

/**
 * Form
 * @constructor
 */
var Form = function Form(form) {
	this.form = form;
	this.inputs = form.querySelectorAll('input');
};

/* Test */
var element = document.querySelector('form');
var form = new Form(element);
/* End Test */