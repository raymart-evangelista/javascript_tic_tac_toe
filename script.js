// player factory
const Player = (name, number) => {
  const getName = () => name;
  const getNumber = () => number;
  return {getName, getNumber};
};

// gameboard module
const gameboard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const updateBoard = (index, number) => board.splice(index, 1, number)
  const getBoard = () => board;
  return {getBoard, updateBoard};
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
const flowController = ((currentPlayer) => {
  const updateTurn = () => {
    // if (currentPlayer)
  }
})();



// creating players
const jimmy = Player('Jimmy McGill', 0);
const kim = Player('Kim Wexler', 1);

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

console.log(turns.getTurn());
turns.updateTurn();
console.log(turns.getTurn());
turns.updateTurn();
console.log(turns.getTurn());
turns.updateTurn();
console.log(turns.getTurn());
turns.updateTurn();
console.log(turns.getTurn());


function checkMove(elem) {

  // when square is clicked, get square number, go into gameboard
  // if corresponding number in index is 0, update
  // if corresponding number in index is something else, don't update
  console.log(elem.id)

}