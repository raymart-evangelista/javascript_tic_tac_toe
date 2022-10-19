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
  const checkWinner = (moveIndex) => {
    // brute force method
    // check column win
    let columnIndex = moveIndex % 3;
    const count = gameboard.getBoard().length / 3;
    for (let index = 0; index < count; index++) {
      if (getBoard().at(columnIndex) != turns.getTurn()) {
        break;
      }
      if (index == count - 1) {
        return true;
      }
      columnIndex = columnIndex + 3
    }
    // check row win
    let rowIndex = null;
    if ([0,1,2].includes(moveIndex)) {
      rowIndex = 0
    } else if ([3,4,5].includes(moveIndex)) {
      rowIndex = 3
    } else {
      rowIndex = 6
    }
    for (let index = 0; index < count; index++) {
      if (getBoard().at(rowIndex) != turns.getTurn()) {
        break;
      }
      if (index == count - 1) {
        return true;
      }
      rowIndex = rowIndex + 1;
    }
    // check diagonal win
    if ([0,4,8].includes(moveIndex)) {
      let diagIndex = 0;
      for (let index = 0; index < count; index++) {
        if (getBoard().at(diagIndex) != turns.getTurn()) {
          break;
        }
        if (index == count - 1) {
          return true;
        }
        diagIndex = diagIndex + 4;
      }
    } else if ([2, 4, 6].includes(moveIndex)) {
      let diagIndex = 2;
      for (let index = 0; index < count; index++) {
        if (getBoard().at(diagIndex) != turns.getTurn()) {
          break;
        }
        if (index == count - 1) {
          return true;
        }
        diagIndex = diagIndex + 2;
      }
    }
    return false;
  }
  const updateBoard = (index, number) => board.splice(index, 1, number);
  const getBoard = () => board;
  return {getBoard, updateBoard, validateMove, checkWinner};
})();

// displaycontroller module
const displayController = (() => {
  // create HTML to display
  document.body.onload = createBoard
  function createBoard() {
    const htmlBoard = document.getElementById("game-board");
    for (let index = 0; index < gameboard.getBoard().length; index++) {
      let newDiv = document.createElement("div");
      newDiv.id = index;
      newDiv.className = "aspect-square p-8 bg-purple-300 hover:bg-purple-500";
      // newDiv.addEventListener("click", flowController.checkMove(newDiv));
      newDiv.onclick = function() { flowController.checkMove(newDiv) };
      htmlBoard.appendChild(newDiv);
    }
  }
  const reloadBoard = () => {

    return true;
  }
  return {reloadBoard}
})();

// flowControl module
const flowController = (() => {

  const p1 = Player('Javascript', 1);
  const p2 = Player('Ruby', 2);

  function checkMove(elem) {
    boardIndex = parseInt(elem.id);
    console.log(`the board index is: ${boardIndex}`)
    // check whose turn it is currently
    if (turns.getTurn() == p1.getNumber()) {
      currPlayer = p1;
    } else {
      currPlayer = p2;
    }

    if (gameboard.validateMove(boardIndex)) {
      // move is valid, so update gameboard
      gameboard.updateBoard(boardIndex, currPlayer.getNumber());
      // console.log(gameboard.getBoard())
      // update display
      // check winner
      // console.log(gameboard.checkWinner(boardIndex));
      if (gameboard.checkWinner(boardIndex)) {
        console.log(`We have a winner! The winner is ${currPlayer.getName()}`)
      }
      turns.updateTurn()

    } else {
      // do nothing
    }
    // when square is clicked, get square number, go into gameboard
    // if corresponding number in index is 0, update
    // if corresponding number in index is something else, don't update
  }

  return {checkMove}
})();

const turns = (() => {
  let defaultTurn = 1;
  const getTurn = () => defaultTurn;
  const updateTurn = () => {
    if (getTurn() == 1 ) {
      defaultTurn = 2;
    } else {
      defaultTurn = 1;
    }
  }
  return {getTurn, updateTurn};
})();


