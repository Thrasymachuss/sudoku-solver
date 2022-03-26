export default async function solve(args) {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    const board = args.boardInput ? args.boardInput : [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    
    const rowStart = 1;
    const colStart = 1;

    const solutions = 0;

    const cells = args.cellClassName ? document.querySelectorAll(`.${args.cellClassName}`) : null;
    const givenSolution = args.solution || null;

    const numSolutions = await next(board, rowStart, colStart, digits,
         solutions, args.getFirstSolution, cells, givenSolution);

    const ret = (args.getFirstSolution) ? board : numSolutions;
    return ret;

}

async function next(board, row, col, digits, solutions, getFirstSolution, cells, givenSolution) {

    let updatedSolutionsNum = solutions;
    if (row > 9) {
        updatedSolutionsNum++;
        return updatedSolutionsNum;
    }


    const shuffledDigits = shuffle(digits);

    const nextRow = (col > 8) ? row + 1 : row;
    const nextCol = (col > 8) ? 1 : col + 1;

    if (board[row - 1][col - 1]) {
        updatedSolutionsNum = await next(board, nextRow, nextCol, digits,
             updatedSolutionsNum, getFirstSolution, cells, givenSolution);
        if (getFirstSolution && updatedSolutionsNum) {
            return updatedSolutionsNum;
        }
    } else {

        for(const digit of shuffledDigits) {
            board[row - 1][col - 1] = digit;
            
            if (cells) await updateCell(cells, row - 1, col - 1, digit, givenSolution);
            
            const cell3x3 = getCell3x3(board, row, col);

            if (rowConflict(board, row) || colConflict(board, col) || cellConflict(cell3x3)) {
                board[row - 1][col - 1] = 0;
                continue;
            }
            
            updatedSolutionsNum = await next(board, nextRow, nextCol, digits,
                 updatedSolutionsNum, getFirstSolution, cells, givenSolution);
            if (getFirstSolution && updatedSolutionsNum) {
                return updatedSolutionsNum;
            } 
        }

        board[row - 1][col - 1] = 0;
        if (cells) await updateCell(cells, row - 1, col - 1, "", givenSolution);

    }

    return updatedSolutionsNum;
}


function shuffle(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}


function rowConflict(board, row) {
    const usedDigits = {};
    const currentRow = board[row - 1]

    for(const cell of currentRow) {

        if (usedDigits[cell]) {
            return true;
        }

        if (cell !== 0) {
            usedDigits[cell] = true;
        }

    }

    return false;
}


function colConflict(board, col) {
    const usedDigits = {};
    
    for(const row of board) {
        const cell = row[col - 1];

        if (usedDigits[cell]) {
            return true;
        }

        if (cell !== 0) {
            usedDigits[cell] = true;
        }
    }

    return false;
}


function cellConflict(cell3x3) {
    const usedDigits = {};

    for (const cell of cell3x3) {
        if (usedDigits[cell]) {
            return true;
        }

        if (cell !== 0) {
            usedDigits[cell] = true;
        }
    }

    return false;
}


function getCell3x3(board, row, col) {
    const cell3x3 = [];

    const [startRow, endRow] = get3x3StartEnd(row);
    const [startCol, endCol] = get3x3StartEnd(col);

    for (let i = startRow; i < endRow; i++) {
        cell3x3.push(...board[i].slice(startCol, endCol));
    }

    return cell3x3;
}


function get3x3StartEnd(rowOrCol) {
    let startVal;
    let endVal;

    if (rowOrCol > 6) {
        startVal = 6;
        endVal = 9;
    } 
    else if (rowOrCol > 3) {
        startVal = 3;
        endVal = 6;
    }
    else {
        startVal = 0;
        endVal = 3;
    }

    return [startVal, endVal];
}


function getCellIndex(row, col) {
    return row*9 + col;
}


function updateCell(cells, row, col, digit, givenSolution) {
    return new Promise((resolve) => {
        const cell = cells[getCellIndex(row, col)];
        cell.textContent = digit;
        cell.classList.add("user-added");
        cell.classList.remove("notes");

        if (givenSolution[row][col] === digit) {
            cell.classList.remove("wrong");
        } else {
            cell.classList.add("wrong");
        }

        setTimeout(resolve, 0);
    });
}
