import solve from "./solve";
import unsolve from "./unsolve";

export default class Game {
    async initialize(args) {
        this.solution = args.solution || await solve({getFirstSolution: true});
        this.difficulty = args.difficulty || "easy";
        this.minDigits = this.#getMinDigits();
        this.puzzle = args.puzzle || await unsolve(this.solution, this.minDigits);
        this.board = JSON.parse(JSON.stringify(this.puzzle));
    }

    #getMinDigits() {
        switch (this.difficulty) {
            case "expert":
                return 25;
            case "hard":
                return 30;
            case "medium":
                return 35;
            case "easy":
                return 40;
        }
    }

    enterInput(row, col, value) {
        this.board[row][col] = Number(value);
    }

    canAcceptInput(row, col) {
        if (this.puzzle[row][col] !== 0) {
            return false;
        }
        return true;
    }

    erase(row, col) {
        if (this.puzzle[row][col] !== 0) return false;

        this.board[row][col] = 0;
        return true;
    }

    isCorrect(row, col, value) {
        return this.solution[row][col] === value;
    }

    checkIfWin() {
        return JSON.stringify(this.board) === JSON.stringify(this.solution);
    }
}