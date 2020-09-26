/**
 * index.js
 */
'use strict';

/**
 * MyMorpionXO
 * @constructor
 */
var MyMorpionXO = function MyMorpionXO() {
	this.scoreX;
	this.scoreO;
	this.whosPlaying;
	this.isPlaying;
};

/**
 * Style
 * @return {Object} this
 */
MyMorpionXO.prototype._style = function() {
	var fontFamily = document.createElement('link');
	var sheet = document.createElement('style');

	fontFamily.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap';
	fontFamily.rel = 'stylesheet';
	document.head.appendChild(fontFamily);
	sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --white: #FFF; --grey: #BBB; }';
	sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; font-family: \'Roboto\', sans-serif; }';
	sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; }';
	sheet.innerHTML += '.container { margin: auto; padding: 1em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 0.6em; }';
	sheet.innerHTML += '.players-part { width: 27em; margin-bottom: 1.5em;}';
	sheet.innerHTML += '.players { width: 100%; display: flex;	justify-content: space-around; font-size: 1.5em; margin-bottom: 0.5em; }';
	sheet.innerHTML += '.players-score > span {	color: var(--primary-color); }';
	sheet.innerHTML += '.player-turn { font-size: 1.2em; margin: auto; width: fit-content; }';
	sheet.innerHTML += '.board { margin: 0; padding: 0;	list-style: none; display: grid; height: 24em; column-gap: 0.5em; row-gap: 0.5em; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }';
	sheet.innerHTML += '.board-cell { background-color: var(--grey); display: flex;	align-items: center; justify-content: center; font-size: 3.5em;	color: var(--white); }';
	document.head.appendChild(sheet);
	return this;
};

/**
 * Create Players Part
 * @param {Object} container
 * @return {Object} this
 */
MyMorpionXO.prototype._createPlayersPart = function(container) {
	var playersPart = document.createElement('div');
	var players = document.createElement('div');
	var playerTurn = document.createElement('div');

	playersPart.classList.add('players-part');
	players.classList.add('players');
	players.innerHTML = '<div class="players-score">X : <span id="scoreX">O</span></div>';
	players.innerHTML += '<div class="players-score">O : <span id="scoreO">O</span></div>';
	playerTurn.classList.add('player-turn');
	playerTurn.innerHTML = 'C\'est à <span id="playerTurn">X</span> de jouer';
	container.appendChild(playersPart);
	playersPart.appendChild(players);
	playersPart.appendChild(playerTurn);
	return this;
};

/**
 * Create Board
 * @param {Object} container
 * @return {Object} this
 */
MyMorpionXO.prototype._createBoard = function(container) {
	var board = document.createElement('ul');

	for (var i = 0; i < 9; i++) {
		board.innerHTML += '<li class="board-cell"></li>';
	}

	board.classList.add('board');
	board.id = 'board';
	container.appendChild(board);
	return this;
};

/**
 * Create Components
 * @return {Object} this
 */
MyMorpionXO.prototype._createComponents = function() {
	var container = document.createElement('div');

	container.classList.add('container');
	document.body.appendChild(container);
	this._createPlayersPart(container);
	this._createBoard(container);
	return this;
};

/**
 * Bind Events
 * @return {Object} this
 */
MyMorpionXO.prototype._bindEvents = function() {
	var board = document.querySelector('#board');
	var cells = board.children;

	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', function(e) {
			e.target.textContent = this.whosPlaying ? 'O' : 'X';
			this.whosPlaying = this.whosPlaying ? 0 : 1;
		}.bind(this));
	}
};

/**
 * Init Game
 * @return {Object} this
 */
MyMorpionXO.prototype._initGame = function() {
	var scoreO = document.querySelector('#scoreO');
	var scoreX = document.querySelector('#scoreX');
	var playerTurn = document.querySelector('#playerTurn');
	var board = document.querySelector('#board');
	var cells = board.children;

	this.whosPlaying = Math.floor(Math.random() * 2);
	this.scoreX = 0;
	this.scoreO = 0;
	this.isPlaying = true;
	scoreO.textContent = this.scoreO;
	scoreX.textContent = this.scoreX;
	playerTurn.textContent = this.whosPlaying ? 'O' : 'X';
	for (var i = 0; i < cells.length; i++) {
		cells[i].textContent = ' ';
	}

	return this;
};

/**
 * Run
 * @return {Object} this
 */
MyMorpionXO.prototype.run = function() {
	this._style();
	this._createComponents();
	this._bindEvents();
	this._initGame();
	return this;
};

var morpion = new MyMorpionXO();
morpion.run();