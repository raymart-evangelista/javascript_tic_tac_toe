// player factory
const Player = (name, number) => {
  const getName = () => name;
  const getNumber = () => number;
  return {getName, getNumber};
};

// gameboard module
const gameboard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const validateMove = (index) => {
    if (board.at(index) == 0) {
      return true;
    } else {
      return false;
    }
  }
  const updateBoard = (index, number) => board.splice(index, 1, number)
  const getBoard = () => board;
  return {getBoard, updateBoard, validateMove};
})();

// displaycontroller module
const displayController = (() => {
  // create HTML to display
  document.body.onload = loadBoard
  function loadBoard() {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode("Hello!");
    newDiv.appendChild(newContent);
    const currentDiv = document.getElementById("board");
    document.body.insertBefore(newDiv, currentDiv)

    gameboard.getBoard()

  }
  const reloadBoard = () => {

    return true;
  }
  return {reloadBoard}
})();

// flowControl module
const flowController = (() => {

  const p1 = Player('Jimmy McGill', 0);
  const p2 = Player('Kim Wexler', 1);

  function checkMove(elem) {
    boardIndex = elem.id;
    // check whose turn it is currently
    if (turns.getTurn() == p1.getNumber()) {
      currPlayer = p1;
    } else {
      currPlayer = p2;
    }
    console.log(`The current player is ${currPlayer.getName()}`)
    console.log(gameboard.validateMove(boardIndex))
    // when square is clicked, get square number, go into gameboard
    // if corresponding number in index is 0, update
    // if corresponding number in index is something else, don't update
    console.log(elem.id)
  }

  return {checkMove}
})();

const turns = (() => {
  let defaultTurn = 0;
  const getTurn = () => defaultTurn;
  const updateTurn = () => {
    if (getTurn() == 0 ) {
      defaultTurn = 1;
    } else {
      defaultTurn = 0;
    }
  }
  return {getTurn, updateTurn};
})();

// console.log(turns.getTurn());
// turns.updateTurn();
// console.log(turns.getTurn());
// turns.updateTurn();
// console.log(turns.getTurn());
// turns.updateTurn();
// console.log(turns.getTurn());
// turns.updateTurn();
// console.log(turns.getTurn());


