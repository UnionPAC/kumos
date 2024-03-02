import {
  createApp,
  h,
  hFragment,
} from "https://unpkg.com/kumos@1.0.12/dist/kumos.js";

const state = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "X",
  draw: false,
  winner: null,
};

const reducers = {
  mark: markReducer,
};

/* REDUCER FUNCTIONS */

function markReducer({ board, currentPlayer }, { row, col }) {
  // check mark boundaries
  if (row > 3 || row < 0 || col > 3 || col < 0) {
    throw new Error("Invalid Move: Space doesn't exist on board");
  }

  // check if already marked
  if (board[row][col]) {
    throw new Error("Invalid Move: Space already taken");
  }

  // set mark
  const newBoard = [[...board[0]], [...board[1]], [...board[2]]];
  newBoard[row][col] = currentPlayer;

  const newPlayer = currentPlayer === "X" ? "O" : "X";
  const winner = checkWinner(newBoard, currentPlayer);
  const draw = !winner && newBoard.every((row) => row.every((cell) => cell));

  return {
    board: newBoard,
    currentPlayer: newPlayer,
    draw,
    winner,
  };
}

/* GAME LOGIC FUNCTIONS */
// Winning Possibilities
/*
["_", "_", "_"]
["_", "_", "_"]
["_", "_", "_"]

Row: [0, 1, 2], [3, 4, 5], [6, 7, 8]
Col: [0, 3, 6], [1, 4, 7], [2, 5, 8]
Diagnol: [0, 4, 8], [2, 4, 6]
*/

function checkWinner(board, player) {
  for (let i = 0; i < 3; i++) {
    if (checkRow(board, i, player)) {
      return player;
    }

    if (checkCol(board, i, player)) {
      return player;
    }
  }

  if (checkDiagnol(board, player)) {
    return player;
  }

  return null;
}

function checkRow(board, index, player) {
  const row = board[index];
  return row.every((cell) => cell === player);
}

function checkCol(board, index, player) {
  const col = board[index];
  return col.every((cell) => cell === player);
}

function checkDiagnol(board, player) {
  const mainDiagnol = [board[0][0], board[1][1], board[2][2]];
  const secondaryDiagnol = [board[0][2], board[1][1], board[2][0]];

  if (mainDiagnol.every((cell) => cell === player)) {
    return true;
  } else if (secondaryDiagnol.every((cell) => cell === player)) {
    return true;
  } else {
    return false;
  }
}

/* VIEW */

function App(state, emit) {
  return hFragment([Header(state), Board(state, emit)]);
}

function Header({ winner, draw, currentPlayer }) {
  if (winner) {
    return h("h3", { class: "win-title" }, [`Player ${winner} wins!`]);
  }

  if (draw) {
    return h("h3", { class: "draw-title" }, ["It's a draw!"]);
  }

  return h("h3", {}, [`It's ${currentPlayer}'s turn!`]);
}

function Board({ winner, draw, board }, emit) {
  const freezeBoard = winner | draw;

  return h("table", { class: freezeBoard ? "frozen" : "" }, [
    h(
      "tbody",
      {},
      board.map((row, i) => Row({ row, i }, emit))
    ),
  ]);
}

function Row({ row, i }, emit) {
  return h(
    "tr",
    {},
    row.map((cell, j) => Cell({ cell, i, j }, emit))
  );
}

function Cell({ cell, i, j }, emit) {
  const mark = cell
    ? h("span", { class: "cell-text" }, [cell])
    : h(
        "div",
        {
          class: "cell",
          on: { click: () => emit("mark", { row: i, col: j }) },
        },
        []
      );

  return h("td", {}, [mark]);
}

createApp({ state, view: App, reducers }).mount(document.body);
