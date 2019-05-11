const idPattern = /^cell[0-7][0-7]$/;
const cellsBox = document.querySelector('#cells-box');
const allCells = cellsBox.querySelectorAll('.playarea__square');
let internalBoard = null;

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

const restoreInitState = function restoreInitialStateOfVisualPresentation(cells) {
  for (let i = 0; i < cells.length; i += 1) {
    if (cells[i].classList.contains('active')) {
      cells[i].classList.remove('active');
    } else if (cells[i].classList.contains('posible')) {
      cells[i].classList.remove('posible');
    }
  }
};

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

const getInitPos = function getInitialPositionFromIdClickedCell(cellId) {
  const coords = cellId.slice(-2).split('');
  return [Number(coords[0]), Number(coords[1])];
};

const showMoves = function displayPossibleMovesOfFigures(boardWithMark) {
  for (let i = 0; i < boardWithMark.length; i += 1) {
    for (let j = 0; j < boardWithMark[i].length; j += 1) {
      if (boardWithMark[i][j]) {
        allCells[i * 8 + j].classList.add('posible');
      }
    }
  }
};

getInintVisualRepresentation(allCells);

cellsBox.addEventListener('click', (evt) => {
  if (idPattern.test(evt.target.id)) {
    const cellId = evt.target.id;
    restoreInitState(allCells);
    evt.target.classList.add('active');
    internalBoard = getInternalReprWithPossibleMoves(getInitPos(cellId));
    showMoves(internalBoard);
  }
});

document.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 27) {
    restoreInitState(allCells);
  }
});
