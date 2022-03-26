import Game from "./game";
import solve from "./solve";

const board = document.querySelector(".board");
const selectDifficulty = document.querySelector(".select-difficulty");
const difficulties = document.querySelectorAll(".difficulty");
const overlay = document.querySelector(".overlay");
const overlayMsg = document.querySelector(".msg");
const solvedMsg = document.querySelector(".solved-msg");
const cells = board.childNodes;
const numberPad = document.querySelectorAll(".number-selection");

const timer = document.querySelector(".timer-display");
const pause = document.querySelector(".pause");
const pauseSymbol = document.querySelector(".fa-solid");

const newGame = document.querySelector(".new-game");
const solveForMe = document.querySelector(".solve-for-me");

const undo = document.querySelector("#undo");
const erase = document.querySelector("#erase");
const notes = document.querySelector("#notes");
const hint = document.querySelector("#hint");
const showMistakes = document.querySelector("#show-mistakes");

export default class UserInterface {
    
    constructor() {
        this.firstGame = true;
        this.notesOn = false;
        notes.addEventListener("click", this.toggleNotes.bind(this));
        showMistakes.addEventListener("click", toggleMistakes);

        for (let i = 0; i < 81; i++) {
            generateCell(i);
        }

        difficulties.forEach((difficulty) => {
            difficulty.addEventListener("click", async (e) => {
                await hideBoard("Please wait while we generate your puzzle...");
                await this.gameInit(e);
                await revealBoard();

                if (this.firstGame) {
                    this.setupEventListeners();
                    this.firstGame = false;
                }
                
                this.uiLocked = false;
            });
        });
    }

    async gameInit(e) {
        this.difficulty = e.target.closest(".difficulty").id;

        this.game = new Game();
        await this.game.initialize({"difficulty": this.difficulty})
        
        this.selectedCell = null;
        this.actionsStack = [];
        this.timeElapsed = 0;

        this.paused = false;
        this.uiLocked = true;
        this.solved = false;

        cells.forEach((cell) => {
            const [row, col] = getRowCol(cell.id);
            cell.classList.remove("user-added");
            cell.classList.remove("wrong");
            cell.classList.remove("selected");
            cell.classList.remove("same-value");
            cell.classList.remove("same-group");
            if (this.game.board[row][col] !== 0) {
                cell.textContent = this.game.board[row][col];
            } else {
                cell.textContent = "";
            }
        });

        this.clearIntervalId = setInterval(this.clockTick.bind(this), 1000);
        solvedMsg.classList.remove("show");
        this.solved = false;
    }

    resetUI() {
        if (this.uiLocked) return;

        this.uiLocked = true;
        clearInterval(this.clearIntervalId);
        pauseSymbol.classList.remove("fa-play");
        pauseSymbol.classList.add("fa-pause");

        selectDifficulty.classList.remove("hidden");
        board.classList.add("hidden");
        overlay.classList.add("hidden");
    }

    setupEventListeners() {
        cells.forEach((cell) => {
            cell.addEventListener("click", this.selectCell.bind(this));
        });

        numberPad.forEach((button) => {
            button.addEventListener("click", this.handleUserInput.bind(this));
        });

        document.addEventListener("keydown", handleKeyPress);

        pause.addEventListener("click", this.pauseGame.bind(this));
        erase.addEventListener("click", this.eraseCell.bind(this));
        hint.addEventListener("click", this.giveHint.bind(this));
        undo.addEventListener("click", this.undoLastAction.bind(this));

        newGame.addEventListener("click", this.resetUI.bind(this));
        solveForMe.addEventListener("click", this.solvePuzzle.bind(this));
    }

    async solvePuzzle() {
        if (this.uiLocked || this.paused) return;

        this.uiLocked = true;
        
        const newSolution = await solve({
            boardInput: JSON.parse(JSON.stringify(this.game.puzzle)),
            getFirstSolution: true,
            cellClassName: "cell",
            solution: this.game.solution
        });

        this.game.board = newSolution;
        this.handleWinConditions();
        this.uiLocked = false;
    }

    undoLastAction() {
        if (this.uiLocked || this.paused || this.actionsStack.length < 1) return;

        const actionToUndo = this.actionsStack.pop();
        const cell = document.getElementById(actionToUndo[0]);

        if (this.selectedCell !== cell) this.handleCellSelection(cell);
        
        switch(actionToUndo[1]) {
            case "replaceValue":
                if (actionToUndo[2]) {
                    const [row, col] = getRowCol(this.selectedCell.id);
                    this.enterAsAnswer(row, col, actionToUndo[2], false);
                } else {
                    this.eraseCell();
                }
                break;
            case "changeNotesToInput":
                this.eraseCell();
                for (const note of actionToUndo[2]) {
                    this.handleAsNote(note, false);
                }
                break;
            case "note":
                this.handleAsNote(actionToUndo[2], false);
                break;
            case "eraseNotes":
                for (const note of actionToUndo[2]) {
                    this.handleAsNote(note, false);
                }
                break;
            case "eraseNumber":
                const [row, col] = getRowCol(this.selectedCell.id);
                this.enterAsAnswer(row, col, actionToUndo[2], false);
                break;
            default:
                console.log("Error: invalid undo action");
        }
    }

    giveHint() {
        if (this.uiLocked || this.paused) return;

        const cell = getRandomEmptyCell();
        if (!cell) return;

        const [row, col] = getRowCol(cell.id);
        const hint = this.game.solution[row][col];

        if (this.selectedCell !== cell) this.handleCellSelection(cell);

        this.enterAsAnswer(row, col, hint, true);
    }

    toggleNotes() {
        this.notesOn = !this.notesOn;
        notes.classList.toggle("on");
    }

    eraseCell(e) {
        if (this.uiLocked || this.paused || !this.selectedCell) return;

        const [row, col] = getRowCol(this.selectedCell.id);
        if (this.game.puzzle[row][col]) return;
        
        if (e) {
            const containsNotes = this.selectedCell.classList.contains("notes");
            const eraseType = containsNotes ? "eraseNotes" : "eraseNumber";
            const eraseValue = containsNotes ? getCellNotes(this.selectedCell) : this.selectedCell.textContent;

            this.actionsStack.push([this.selectedCell.id, eraseType, eraseValue]);
        }

        this.game.erase(row, col);
        this.selectedCell.textContent = "";
        this.selectedCell.classList.remove("wrong");
        this.selectedCell.classList.remove("user-added");
        this.selectedCell.classList.remove("notes");

        solvedMsg.classList.remove("show");
        this.solved = false;

    }

    handleUserInput(e) {

        if (this.uiLocked || this.paused || !this.selectedCell) return;

        const enteredNumber = e.target.textContent;

        if (this.notesOn) {
            this.handleAsNote(enteredNumber, true);
        } else {
            const [row, col] = getRowCol(this.selectedCell.id);
            this.enterAsAnswer(row, col, enteredNumber, true);
        }
    }

    async handleAsNote(enteredNumber, triggeredByEvent) {
        if (this.selectedCell.textContent && !this.selectedCell.classList.contains("notes"))
            return;
        
        if (!this.selectedCell.classList.contains("notes")) {
            await addNotesGrid(this.selectedCell);
        }

        const noteElement = this.selectedCell.querySelector(`.note-${enteredNumber}`);
        noteElement.textContent = (noteElement.textContent) ? "" : enteredNumber;

        if (triggeredByEvent) {
            this.actionsStack.push([this.selectedCell.id, 'note', enteredNumber]);
        }
    }

    enterAsAnswer(row, col, enteredNumber, triggeredByEvent) {
        const canAccept = this.game.canAcceptInput(row, col);
        if (!canAccept) return; 

        if (triggeredByEvent) {
            const hasNotes = this.selectedCell.classList.contains("notes")
            const action = hasNotes ?
                "changeNotesToInput" : "replaceValue";
            const replaced = hasNotes ?
                getCellNotes(this.selectedCell) : this.selectedCell.textContent;
            this.actionsStack.push([this.selectedCell.id, action, replaced]);       
        }

        this.game.enterInput(row, col, enteredNumber);

        this.selectedCell.classList.remove("notes");

        this.selectedCell.textContent = this.game.board[row][col];

        this.selectedCell.classList.add("user-added");

        if (this.game.isCorrect(row, col, this.game.board[row][col])) {
            this.selectedCell.classList.remove("wrong");
            this.handleWinConditions();
        } else {
            this.selectedCell.classList.add("wrong");
            solvedMsg.classList.remove("show");
            this.solved = false;
        }
    }

    selectCell(e) {
        const clickedCell = e.target.closest(".cell");
        this.handleCellSelection(clickedCell);
    }

    handleCellSelection(cell) {
        const deselect = this.selectedCell === cell;
        this.selectedCell = cell;

        const selectedId = this.selectedCell.id;
        const [selectedRow, selectedCol] = getRowCol(selectedId);
        const selected3x3 = current3x3(selectedRow, selectedCol);
        const selectedValue = cell.textContent;

        cells.forEach((cell) => {
            const [row, col] = getRowCol(cell.id);
            const cell3x3 = current3x3(row, col)

            cell.classList.remove("selected");
            cell.classList.remove("same-value");
            cell.classList.remove("same-group");

            if (!deselect) {
                if (cell.id === selectedId) {
                    cell.classList.add("selected");
                } else if (cell.textContent && cell.textContent === selectedValue 
                && !cell.classList.contains("notes") && !this.selectedCell.classList.contains("notes")) {
                    cell.classList.add("same-value");
                } else if (row === selectedRow || col === selectedCol || cell3x3 === selected3x3) {
                    cell.classList.add("same-group");
                }
            }
        });

        if (deselect) {
            this.selectedCell = null;
        }
    }

    clockTick() {
        this.timeElapsed += 1;

        const hours = Math.floor(this.timeElapsed / 3600);
        const minutes = Math.floor(this.timeElapsed / 60 - 60*hours);
        const seconds = Math.floor(this.timeElapsed - 60*minutes - 3600*hours);

        timer.textContent = `${hours ? hours + ':' : ''}${minutes}:`
            + `${seconds < 10 ? '0' : ''}${seconds}`;
    }

    pauseGame() {
        if (this.uiLocked) return;

        if (this.paused) {
            if (!this.solved) {
                this.clearIntervalId = setInterval(this.clockTick.bind(this), 1000);
            }
            pauseSymbol.classList.remove("fa-play");
            pauseSymbol.classList.add("fa-pause");
            revealBoard();
        } else {
            clearInterval(this.clearIntervalId);
            pauseSymbol.classList.remove("fa-pause");
            pauseSymbol.classList.add("fa-play");
            hideBoard("Paused");
        }

        this.paused = !this.paused;
    }

    handleWinConditions() {
        if (this.game.checkIfWin()) {
            solvedMsg.classList.add("show");
            this.solved = true;
            clearInterval(this.clearIntervalId);
        }
    }
}


function hideBoard(msg) {
    return new Promise((resolve) => {
        selectDifficulty.classList.add("hidden");
        board.classList.add("hidden");
        overlay.classList.remove("hidden");
        overlayMsg.textContent = msg;
        setTimeout(resolve, 0);
    });
}


function revealBoard() {
    return new Promise((resolve) => {
        board.classList.remove("hidden");
        overlay.classList.add("hidden");
        setTimeout(resolve, 0);
    });
}


function generateCell(i) {
    const [row, col] = getRowCol(i);
    const newDiv = document.createElement("div");

    newDiv.classList.add("cell");
    newDiv.setAttribute("id", i);

    addCellBorders(newDiv, row, ["xx-top", "x-top", "x-bottom", "xx-bottom"]);
    addCellBorders(newDiv, col, ["xx-left", "x-left", "x-right", "xx-right"]);

    board.appendChild(newDiv);
}


function handleKeyPress(e) {
    const pressed = String.fromCharCode(e.keyCode);
    if (pressed >= 1 && pressed <= 9)
    {
        numberPad[pressed - 1].click();
    }
}


function current3x3(row, col) {
    let indexOf3x3 = 0;

    indexOf3x3 += (row >= 6) ? 2 : (row >= 3 && row < 6) ? 1 : 0;
    indexOf3x3 += (col >= 6) ? 6 : (col >= 3 && col < 6) ? 3 : 0;

    return indexOf3x3;
}


function generateCell(i) {
    const [row, col] = getRowCol(i);
    const newDiv = document.createElement("div");

    newDiv.classList.add("cell");
    newDiv.setAttribute("id", i);

    addCellBorders(newDiv, row, ["xx-top", "x-top", "x-bottom", "xx-bottom"]);
    addCellBorders(newDiv, col, ["xx-left", "x-left", "x-right", "xx-right"]);

    board.appendChild(newDiv);
}


function addCellBorders(newDiv, checkedValue, classes) {
    switch (checkedValue) {
        case 0:
            newDiv.classList.add(classes[0]);
            break;
        case 3:
        case 6:
            newDiv.classList.add(classes[1]);
            break;
        case 2:
        case 5:
            newDiv.classList.add(classes[2]);
            break;
        case 8:
            newDiv.classList.add(classes[3]);
            break;
    }
}


function toggleMistakes() {
    board.classList.toggle("show-mistakes");
    showMistakes.classList.toggle("on");
}


function getRandomEmptyCell() {
    const emptyCells = [];
    cells.forEach((cell) => {
        if (!cell.textContent || cell.classList.contains("notes")) {
            emptyCells.push(cell);
        }
    });

    return (emptyCells.length > 0) ? emptyCells[Math.floor(Math.random()*emptyCells.length)] : null;
}


function getCellNotes(cell) {
    const notesValues = [];
    const notes = cell.querySelectorAll(".note");

    for (const note of notes) {
        if (note.textContent) 
            notesValues.push(note.textContent);
    }

    return notesValues;
}


function addNotesGrid(selectedCell) {
    return new Promise((resolve) => {
        selectedCell.classList.add("notes");

        for (let i = 1; i <= 9; i++) {
            const newNote = document.createElement("span");
            newNote.classList.add("note");
            newNote.classList.add(`note-${i}`)
            selectedCell.appendChild(newNote);
        }

        setTimeout(resolve, 0);
    });
}


function getRowCol(i) {
    return [Math.floor(i / 9), (i % 9)]
}


async function buildGame(args) {
    return new Game(args);
}
