const idPattern = /^cell[0-7][0-7]$/;
const cellsBox = document.querySelector('#cells-box');
const allCells = cellsBox.querySelectorAll('.playarea__square');
let internalBoard = null;

// function draws dark and light chessboard cells in the user interface
const getInintVisualRepresentation = function createInitialVisualRepresentationOfBoard(cells) {
  for (let i = 0; i < cells.length; i += 1) {
    const coords = cells[i].id.slice(-2).split('');
    if ((Number(coords[0]) + Number(coords[1])) % 2 === 0) {
      cells[i].classList.add('light');
    } else {
      cells[i].classList.add('dark');
    }
  }
};

// the function restores the initial state of the chessboard
const restoreInitState = function restoreInitialStateOfVisualPresentation(cells) {
  for (let i = 0; i < cells.length; i += 1) {
    if (cells[i].classList.contains('active')) {
      cells[i].classList.remove('active');
    } else if (cells[i].classList.contains('posible')) {
      cells[i].classList.remove('posible');
    }
  }
};

// the function creates an internal representation of the chessboard and
// on the basis of the position of the figure, marks its possible moves
const getInternalReprWithPossibleMoves = function getInternalReprBoardWithPossibleMoves(initPos) {
  const board = [];
  for (let i = 0; i < 8; i += 1) {
    const row = [];
    for (let j = 0; j < 8; j += 1) {
      row.push(null);
    }
    board.push(row);
  }
  if (initPos[0] - 1 >= 0 && initPos[1] + 2 <= 7) {
    board[initPos[0] - 1][initPos[1] + 2] = true;
  }
  if (initPos[0] - 1 >= 0 && initPos[1] - 2 >= 0) {
    board[initPos[0] - 1][initPos[1] - 2] = true;
  }
  if (initPos[0] + 1 <= 7 && initPos[1] - 2 >= 0) {
    board[initPos[0] + 1][initPos[1] - 2] = true;
  }
  if (initPos[0] + 1 <= 7 && initPos[1] + 2 <= 7) {
    board[initPos[0] + 1][initPos[1] + 2] = true;
  }

  if (initPos[0] - 2 >= 0 && initPos[1] + 1 <= 7) {
    board[initPos[0] - 2][initPos[1] + 1] = true;
  }
  if (initPos[0] - 2 >= 0 && initPos[1] - 1 >= 0) {
    board[initPos[0] - 2][initPos[1] - 1] = true;
  }
  if (initPos[0] + 2 <= 7 && initPos[1] + 1 <= 7) {
    board[initPos[0] + 2][initPos[1] + 1] = true;
  }
  if (initPos[0] + 2 <= 7 && initPos[1] - 1 >= 0) {
    board[initPos[0] + 2][initPos[1] - 1] = true;
  }
  return board;
};

// the function gets the ID of the clicked cell and returns its coordinates
// as numbers for use with the internal representation of the board
const getInitPos = function getInitialPositionFromIdClickedCell(cellId) {
  const coords = cellId.slice(-2).split('');
  return [Number(coords[0]), Number(coords[1])];
};

// the function gets an internal representation of the chessboard with marked
// possible moves of the figure and draws them in a visual representation
const showMoves = function displayPossibleMovesOfFigures(boardWithMark) {
  for (let i = 0; i < boardWithMark.length; i += 1) {
    for (let j = 0; j < boardWithMark[i].length; j += 1) {
      if (boardWithMark[i][j]) {
        allCells[i * 8 + j].classList.add('posible');
      }
    }
  }
};

// draws dark and light cells on a visual chessboard
getInintVisualRepresentation(allCells);

// listen clicks on the board area, get the identifier of the corresponding cell
// and process the click
cellsBox.addEventListener('click', (evt) => {
  if (idPattern.test(evt.target.id)) {
    const cellId = evt.target.id;
    restoreInitState(allCells);
    evt.target.classList.add('active');
    internalBoard = getInternalReprWithPossibleMoves(getInitPos(cellId));
    showMoves(internalBoard);
  }
});

// pressing the escape key allows to clear the visual board from cells with marks
document.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 27) {
    restoreInitState(allCells);
  }
});
