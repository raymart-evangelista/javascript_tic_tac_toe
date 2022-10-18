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
const flowController = ((player1, player2) => {

})();

// player factory
const Player = (name, number) => {
  const getName = () => name;
  const getNumber = () => number;
  return {getName, getNumber};
};

// creating players
const jimmy = Player('Jimmy McGill', 1);
const kim = Player('Kim Wexler', 2);

// console.log
