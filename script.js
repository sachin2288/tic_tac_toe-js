let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // Player O starts
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const initializeGame = () => {
  turno = true;
  msgContainer.classList.add("hide");
  msg.innerText = "";
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
  newGameBtn.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return;
      }
    }
  }

  if ([...boxes].every((box) => box.innerText !== "")) {
    gameDraw();
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  boxes.forEach((box) => (box.disabled = true));
  newGameBtn.classList.remove("hide");
};

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  newGameBtn.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turno) {
        box.innerText = "O";
        turno = false;
      } else {
        box.innerText = "X";
        turno = true;
      }
      box.disabled = true;
      checkWinner();
    }
  });
});

newGameBtn.addEventListener("click", initializeGame);
resetBtn.addEventListener("click", initializeGame);

// Initialize the game on page load
initializeGame();
