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
	sheet.innerHTML = ':root { --primary-color: #9FD17A; --primary-color-light: #C7FE9F; --primary-color-dark: #8AD058; --white: #FFF; --grey: #BBB; --red: #b71540 }';
	sheet.innerHTML += 'html, body { padding: 0; margin: 0; box-sizing: border-box; font-size: 16px; font-family: \'Roboto\', sans-serif; }';
	sheet.innerHTML += 'body { min-width: 100vw; min-height: 100vh; background-image: linear-gradient(90deg, var(--primary-color-light), var(--primary-color-dark)); display: flex; flex-direction: column; position: relative }';
	sheet.innerHTML += '.container { margin: auto; padding: 1em; box-shadow: 0 0.8em 1em rgba(0, 0, 0, 0.65); background-color: var(--white); border-radius: 0.6em; }';
	sheet.innerHTML += '.players-part { width: 27em; margin-bottom: 1.5em;}';
	sheet.innerHTML += '.players { width: 100%; display: flex;	justify-content: space-around; font-size: 1.5em; margin-bottom: 0.5em; }';
	sheet.innerHTML += '.players-score > span {	color: var(--primary-color); }';
	sheet.innerHTML += '.player-turn { font-size: 1.2em; margin: auto; width: fit-content; }';
	sheet.innerHTML += '.board { margin: 0; padding: 0;	list-style: none; display: grid; height: 24em; column-gap: 0.5em; row-gap: 0.5em; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); }';
	sheet.innerHTML += '.board-cell { background-color: var(--grey); display: flex;	align-items: center; justify-content: center; font-size: 3.5em;	color: var(--white); transition: 300ms }';
	sheet.innerHTML += '.popup { position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); background-color: #FFF; z-index: 10;	display: flex; align-items: center;	justify-content: center; text-align: center; font-size: 1.5em; padding: 2em; }';
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
 * Highlight Cell
 * @param {Object} cell
 * @return {Object} this
 */
MyMorpionXO.prototype._highlightCell = function(cell) {
	cell.style.color = 'var(--red)';
	setTimeout(function() {
		cell.style.color = 'var(--white)';
	}, 1000);

	return this;
};

/**
 * Victory Line
 * @param {Object} cell1
 * @param {Object} cell2
 * @param {Object} cell3
 * @return {Object} this
 */
MyMorpionXO.prototype._victoryLine = function(cell1, cell2, cell3) {
	var highlight = document.createEvent('Event');

	highlight.initEvent('highlight', true, true);
	cell1.dispatchEvent(highlight);
	cell2.dispatchEvent(highlight);
	cell3.dispatchEvent(highlight);
	return this;
};

/**
 * Check Rows
 * @param {Object[]} cells
 * @return {Object} this
 */
MyMorpionXO.prototype._checkRows = function(cells) {
	if (cells[0].textContent === cells[1].textContent &&
		cells[0].textContent === cells[2].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[0], cells[1], cells[2]);
		return this;
	}

	if (cells[3].textContent === cells[4].textContent &&
		cells[3].textContent === cells[5].textContent &&
		cells[3].textContent !== ' ') {
		this.winner = cells[3].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[3], cells[4], cells[5]);
		return this;
	}

	if (cells[6].textContent === cells[7].textContent &&
		cells[6].textContent === cells[8].textContent &&
		cells[6].textContent !== ' ') {
		this.winner = cells[6].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[6], cells[7], cells[8]);
		return this;
	}

	return this;
};

/**
 * Check Cols
 * @param {Object[]} cells
 * @return {Object} this
 */
MyMorpionXO.prototype._checkCols = function(cells) {
	if (cells[0].textContent === cells[3].textContent &&
		cells[0].textContent === cells[6].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[0], cells[3], cells[6]);
		return this;
	}

	if (cells[1].textContent === cells[4].textContent &&
		cells[1].textContent === cells[7].textContent &&
		cells[1].textContent !== ' ') {
		this.winner = cells[1].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[1], cells[4], cells[7]);
		return this;
	}

	if (cells[2].textContent === cells[5].textContent &&
		cells[2].textContent === cells[8].textContent &&
		cells[2].textContent !== ' ') {
		this.winner = cells[2].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[2], cells[5], cells[8]);
		return this;
	}

	return this;
};

/**
 * Check Cols
 * @param {Object[]} cells
 * @return {Object} this
 */
MyMorpionXO.prototype._checkDiags = function(cells) {
	if (cells[0].textContent === cells[4].textContent &&
		cells[0].textContent === cells[8].textContent &&
		cells[0].textContent !== ' ') {
		this.winner = cells[0].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[0], cells[4], cells[8]);
		return this;
	}

	if (cells[2].textContent === cells[4].textContent &&
		cells[2].textContent === cells[6].textContent &&
		cells[2].textContent !== ' ') {
		this.winner = cells[2].textContent === 'X' ? 0 : 1;
		this._victoryLine(cells[2], cells[4], cells[6]);
		return this;
	}

	return this;
};

/**
 * Check Draw
 * @param {Object[]} cells
 * @param {Object} board
 * @return {Object} this
 */
MyMorpionXO.prototype._checkDraw = function(cells, board) {
	var draw = document.createEvent('Event');

	draw.initEvent('draw', true, true);
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].textContent === ' ') {
			return this;
		}
	}
	board.dispatchEvent(draw);
	return this;
};

/**
 * Is There A Winner
 * @return {boolean} winner
 */
MyMorpionXO.prototype._isThereAWinner = function() {
	var board = document.querySelector('#board');
	var cells = board.children;
	var winner = false;

	this._checkRows(cells);
	this.winner !== -1 ? this.winner : this._checkCols(cells);
	this.winner !== -1 ? this.winner : this._checkDiags(cells);
	this.winner !== -1 ? this.winner : this._checkDraw(cells, board);
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
		this._isThereAWinner();
		if (this.winner !== -1) {
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
	this.winner = -1;
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

	setTimeout(function () {
		this._refreshGame();
	}.bind(this), 1000);
	bigWinnerEvent.initEvent('bigWinner', true, true);
	if (this.scoreX === 3 || this.scoreO === 3) {
		board.dispatchEvent(bigWinnerEvent);

		return this;
	}

	return this;
};

/**
 * Ending Game
 * @return {Object this}
 */
MyMorpionXO.prototype._endingGame = function() {
	var popup = document.createElement('div');
	var bodyCover = document.createElement('div');

	popup.classList.add('popup');
	popup.innerHTML = this.winner ? 'O' : 'X';
	popup.innerHTML += ' a gagné<br/>Rechargez la page pour rejouer';
	bodyCover.classList.add('body-cover');
	document.body.appendChild(popup);
	document.body.appendChild(bodyCover);
	return this;
};

/**
 * Render Draw
 * @return {Object} this
 */
MyMorpionXO.prototype._renderDraw = function() {
	var popup = document.createElement('div');
	var bodyCover = document.createElement('div');

	popup.classList.add('popup');
	popup.innerHTML += 'Egalité';
	bodyCover.classList.add('body-cover');
	document.body.appendChild(popup);
	document.body.appendChild(bodyCover);
	setTimeout(function() {
		document.body.removeChild(popup);
		document.body.removeChild(bodyCover);
		this._refreshGame();
	}.bind(this), 1000);
	return this;
}

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
	}.bind(this));
	board.addEventListener('draw', function() {
		this._renderDraw();
	}.bind(this));
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', function(e) {
			this._handleClickOnCell(e.target);
		}.bind(this));
		cells[i].addEventListener('highlight', function(e) {
			this._highlightCell(e.target);
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