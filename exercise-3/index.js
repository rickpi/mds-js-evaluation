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
	this.winner;
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
	sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; position: relative }';
	sheet.innerHTML += '.container { margin: auto; padding: 1em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 0.6em; }';
	sheet.innerHTML += '.players-part { width: 27em; margin-bottom: 1.5em;}';
	sheet.innerHTML += '.players { width: 100%; display: flex;	justify-content: space-around; font-size: 1.5em; margin-bottom: 0.5em; }';
	sheet.innerHTML += '.players-score > span {	color: var(--primary-color); }';
	sheet.innerHTML += '.player-turn { font-size: 1.2em; margin: auto; width: fit-content; }';
	sheet.innerHTML += '.board { margin: 0; padding: 0;	list-style: none; display: grid; height: 24em; column-gap: 0.5em; row-gap: 0.5em; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }';
	sheet.innerHTML += '.board-cell { background-color: var(--grey); display: flex;	align-items: center; justify-content: center; font-size: 3.5em;	color: var(--white); }';
	sheet.innerHTML += '.winner { position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); background-color: #FFF; z-index: 10;	display: flex; align-items: center;	justify-content: center; text-align: center; font-size: 1.5em; padding: 2em; }';
	sheet.innerHTML += '.body-cover { position: absolute; width: 100%; height: 100%; left: 0; right: 0; z-index: 5;	background-color: rgba(0, 0, 0, 0.5); content: ""; }';
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
 * Check Rows
 * @param {Object[]} cells
 * @return {boolean} winner
 */
MyMorpionXO.prototype._checkRows = function(cells) {
	if (cells[0].textContent === cells[1].textContent &&
		cells[0].textContent === cells[2].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		return true;
	}

	if (cells[3].textContent === cells[4].textContent &&
		cells[3].textContent === cells[5].textContent &&
		cells[3].textContent !== ' ') {
		this.winner = cells[3].textContent === 'X' ? 0 : 1;
		return true;
	}

	if (cells[6].textContent === cells[7].textContent &&
		cells[6].textContent === cells[8].textContent &&
		cells[6].textContent !== ' ') {
		this.winner = cells[6].textContent === 'X' ? 0 : 1;
		return true;
	}

	return false;
};

/**
 * Check Cols
 * @param {Object[]} cells
 * @return {boolean} winner
 */
MyMorpionXO.prototype._checkCols = function(cells) {
	if (cells[0].textContent === cells[3].textContent &&
		cells[0].textContent === cells[6].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		return true;
	}

	if (cells[1].textContent === cells[4].textContent &&
		cells[1].textContent === cells[7].textContent &&
		cells[1].textContent !== ' ') {
		this.winner = cells[1].textContent === 'X' ? 0 : 1;
		return true;
	}

	if (cells[2].textContent === cells[5].textContent &&
		cells[2].textContent === cells[8].textContent &&
		cells[2].textContent !== ' ') {
		this.winner = cells[2].textContent === 'X' ? 0 : 1;
		return true;
	}

	return false;
};

/**
 * Check Cols
 * @param {Object[]} cells
 * @return {boolean} winner
 */
MyMorpionXO.prototype._checkDiags = function(cells) {
	if (cells[0].textContent === cells[4].textContent &&
		cells[0].textContent === cells[8].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		return true;
	}

	if (cells[2].textContent === cells[4].textContent &&
		cells[2].textContent === cells[6].textContent &&
		cells[2].textContent !== ' ') {
		this.winner = cells[2].textContent === 'X' ? 0 : 1;
		return true;
	}

	return false;
};

/**
 * Is There A Winner
 * @return {boolean} winner
 */
MyMorpionXO.prototype._isThereAWinner = function() {
	var board = document.querySelector('#board');
	var cells = board.children;
	var winner = false;

	winner = this._checkRows(cells);
	winner = winner ? true : this._checkCols(cells);
	winner = winner ? true :this._checkDiags(cells);
	return winner;
};

/**
 * Render Who's Playing
 * @return {Object} this
 */
MyMorpionXO.prototype._renderWhosPlaying = function() {
	var playerTurn = document.querySelector('#playerTurn');

	playerTurn.textContent = this.whosPlaying ? 'O' : 'X';
	return this;
};

/**
 * Handle Click On Cell
 * @param {Object} cell
 * @param {Object} winnerEvent
 * @return {Object} this
 */
MyMorpionXO.prototype._handleClickOnCell = function(cell) {
	var winnerEvent = document.createEvent('Event');

	winnerEvent.initEvent('winner', true, true);
	if (cell.textContent === ' ') {
		cell.textContent = this.whosPlaying ? 'O' : 'X';
		if (this._isThereAWinner()) {
			this.winner ? this.scoreO++ : this.scoreX++;
			board.dispatchEvent(winnerEvent);
			return ;
		}

		this.whosPlaying = this.whosPlaying ? 0 : 1;
		this._renderWhosPlaying();
	}

	return this;
};

/**
 * Refresh Game
 * @return {Object} this
 */
MyMorpionXO.prototype._refreshGame = function() {
	var scoreO = document.querySelector('#scoreO');
	var scoreX = document.querySelector('#scoreX');
	var playerTurn = document.querySelector('#playerTurn');
	var board = document.querySelector('#board');
	var cells = board.children;

	scoreO.textContent = this.scoreO;
	scoreX.textContent = this.scoreX;
	playerTurn.textContent = this.whosPlaying ? 'O' : 'X';
	for (var i = 0; i < cells.length; i++) {
		cells[i].textContent = ' ';
	}

	return this
};

/**
 * Is There A Big Winner
 * @return {Object} this;
 */
MyMorpionXO.prototype._isThereABigWinner = function(board) {
	var bigWinnerEvent = document.createEvent('Event');

	bigWinnerEvent.initEvent('bigWinner', true, true);
	if (this.scoreX === 3 || this.scoreO === 3) {
		board.dispatchEvent(bigWinnerEvent);

		return this;
	}

	this._refreshGame();
	return this;
};

/**
 * Ending Game
 * @return {Object this}
 */
MyMorpionXO.prototype._endingGame = function() {
	var winner = document.createElement('div');
	var bodyCover = document.createElement('div');

	winner.classList.add('winner');
	winner.innerHTML = this.winner ? 'O' : 'X';
	winner.innerHTML += ' a gagné<br/>Rechargez la page pour rejouer';
	bodyCover.classList.add('body-cover');
	document.body.appendChild(winner);
	document.body.appendChild(bodyCover);
	return this;
};

/**
 * Bind Events
 * @return {Object} this
 */
MyMorpionXO.prototype._bindEvents = function() {
	var board = document.querySelector('#board');
	var cells = board.children;

	board.addEventListener('winner', function () {
		this._isThereABigWinner(board);
	}.bind(this));
	board.addEventListener('bigWinner', function() {
		this._endingGame();
	}.bind(this))
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', function(e) {
			this._handleClickOnCell(e.target);
		}.bind(this));
	}

	return this;
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
	this.winner = -1;
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

/* Test */
var morpion = new MyMorpionXO();
morpion.run();
/* End Test */