import solve from "./modules/solve";
import unsolve from "./modules/unsolve";
import Game from "./modules/game";
import UserInterface from "./modules/ui";


// Tests

const userInterface = new UserInterface();

/*
const selectDifficulty = document.querySelector(".select-difficulty");
const board = document.querySelector(".board");

// selectDifficulty.classList.add("hidden");

for (let i = 0; i < 81; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cell");
    board.appendChild(newDiv);
}

*/
/*
const game = new Game({});

const row = document.querySelector("#row");
const col = document.querySelector("#col");
const val = document.querySelector("#val");

document.querySelector("#submit").addEventListener("click", () => {
    game.enterInput(row.valueAsNumber, col.valueAsNumber, val.valueAsNumber);
});
*/


/*
const board = solve({getFirstSolution: true});
console.log(board);
const puzzle = unsolve(board, 17);
console.log(JSON.parse(JSON.stringify(puzzle)));
const solutionNum = solve({boardInput: puzzle});
console.log(solutionNum);
*/


/*
const boardInput1 = [
    [9, 8, 4, 0, 0, 0, 6, 7, 0],
    [6, 1, 0, 8, 0, 0, 5, 0, 0],
    [0, 5, 7, 0, 0, 0, 0, 3, 1],
    [0, 7, 0, 9, 0, 0, 4, 1, 0],
    [4, 2, 0, 1, 8, 0, 7, 0, 3],
    [5, 0, 0, 3, 0, 4, 0, 0, 0],
    [7, 0, 5, 2, 0, 0, 0, 0, 0],
    [0, 0, 2, 4, 9, 0, 0, 5, 7],
    [1, 9, 0, 0, 0, 3, 2, 0, 0]
];

const [board, numSolutions] = solve({boardInput: boardInput1, getFirstSolution: false});
console.log(board);
console.log(numSolutions);
*/
