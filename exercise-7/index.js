'use strict'

/**
 * Compute Notes
 * @param {number[]} notes
 * @return {number} average
 */ 
var computeNotes = function computeNotes(notes) {
	var amount = 0;
	var average;

	notes.forEach(function(note) {
		amount += note;
	});
	return amount / notes.length;
}

console.log(computeNotes([20, 17, 18, 19]));