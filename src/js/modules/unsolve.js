import solve from "./solve";

export default async function unsolve(solution, minDigits) {
    const indices = {
        0: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        1: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        2: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        3: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        4: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        5: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        6: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        7: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
        8: {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true},
    }

    const puzzle = JSON.parse(JSON.stringify(solution));

    while (countDigits(puzzle) > minDigits) {
        if (Object.keys(indices).length === 0) {
            break;
        }
        await removeDigit(puzzle, indices);
    }
    
    return puzzle;

}


function countDigits(puzzle) {
    let total = 0;
    for (const row of puzzle) {
        for (const cell of row) {
            if (cell !== 0) {
                total++;
            }
        }
    }
    return total;
}

async function removeDigit(puzzle, indices) {
    const rows = Object.keys(indices);
    const randRow = rows[Math.floor(Math.random()*rows.length)];
    const cols = Object.keys(indices[randRow]);
    const randCol = cols[Math.floor(Math.random()*cols.length)];
    
    const valueToRemove = puzzle[randRow][randCol];
    puzzle[randRow][randCol] = 0;

    const numSolutions = await solve({boardInput: puzzle});

    if (numSolutions !== 1) {
        puzzle[randRow][randCol] = valueToRemove;
    }

    delete indices[randRow][randCol];

    if (Object.keys(indices[randRow]).length === 0) {
        delete indices[randRow]
    }
}
