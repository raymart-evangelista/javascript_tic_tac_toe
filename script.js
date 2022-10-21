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
  const checkDraw = () => { return !board.includes(0); }
  const updateBoard = (index, number) => board.splice(index, 1, number);
  const getBoard = () => board;
  return {getBoard, updateBoard, validateMove, checkWinner, checkDraw};
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
  const updateBoard = (index, playerNum) => {
    // based off of player number, update divs to turn into imgs
    const div = document.getElementById(index);
    const img = document.createElement("img");
    if (playerNum == 1) {
      img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
    } else {
      img.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain-wordmark.svg';
    }
    div.replaceWith(img);
    // player 1 gets JavaScript
    // player 2 gets Ruby
    // if board is 0, normal square
  }
  const placeOverlay = (currPlayer) => {
    const htmlBody = document.body;
    const htmlBoard = document.getElementById("game-board");
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    // overlay.className = "absolute self-center justify-self-center border-4 border-red-600 bg-gray-500 opacity-40";
    overlay.className = "absolute w-screen h-screen bg-gray-500 opacity-70"
    htmlBody.insertBefore(overlay, htmlBoard);
    // htmlBoard.append(overlay);
    placeInfo(overlay, currPlayer);
  }
  function placeInfo(overlay, currPlayer) {
    const htmlBody = document.body;

    const infoContainer = document.createElement("div");
    infoContainer.id = "infoContainer"
    infoContainer.className = "flex flex-col gap-4 place-items-center justify-items-center z-10 p-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md"

    const wrapper = document.createElement("div");
    wrapper.id = "wrapper"
    wrapper.className = "absolute grid w-screen h-screen place-items-center justify-items-center"
    
    const winnerText = document.createElement("h2");
    winnerText.className = "text-center"
    if (currPlayer === undefined) {
      winnerText.textContent = 'The game ends in a draw!';
    } else {
      winnerText.textContent = `The winner is ${currPlayer.getName()}!`;
    }

    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again?"
    playAgain.className = "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
    playAgain.onclick = function() { window.location.reload(); }
    
    infoContainer.appendChild(winnerText);
    infoContainer.appendChild(playAgain);

    wrapper.appendChild(infoContainer)
    

    htmlBody.insertBefore(wrapper, overlay);
  }
  return {updateBoard, placeOverlay}
})();

const p1 = Player('Javascript', 1);
displayController.placeOverlay(p1);


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
      console.log(`current player: ${currPlayer.getNumber()}, boardIndex: ${boardIndex}`);
      displayController.updateBoard(boardIndex, currPlayer.getNumber());
      // check winner
      if (gameboard.checkWinner(boardIndex)) {
        displayController.placeOverlay(currPlayer);
        console.log(`We have a winner! The winner is ${currPlayer.getName()}`)
      } else if (gameboard.checkDraw()) {
        displayController.placeOverlay();
        console.log('The game ends in a draw!');
      }
      // do something if no one wins
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


