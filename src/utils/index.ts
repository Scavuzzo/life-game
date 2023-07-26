import { Alive } from "@/types";

function insideMatrix(matrix: Alive[][], x: number, y: number) {
    const columns = matrix[0].length
    const rows = matrix.length
    return x >= 0 && x < rows && y >= 0 && y < columns;
}

export function aliveNeighborsCounter(matrix: Alive[][], x: number, y: number) {
    let count = 0;
    const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

    for (let i = 0; i < 8; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (insideMatrix(matrix, nx, ny) && matrix[nx][ny] === 1) {
            count++;
        }
    }

    return count;
}

export function hasMatrixChanged(originalMatrix: Alive[][], updatedMatrix: Alive[][]): boolean {
    if (originalMatrix.length !== updatedMatrix.length || originalMatrix[0].length !== updatedMatrix[0].length) {
        return true; // Las dimensiones de las matrices son diferentes, por lo que ha cambiado.
    }

    for (let i = 0; i < originalMatrix.length; i++) {
        for (let j = 0; j < originalMatrix[0].length; j++) {
            if (originalMatrix[i][j] !== updatedMatrix[i][j]) {
                return true; // Al menos una celda es diferente, por lo que ha cambiado.
            }
        }
    }

    return false; // No se encontraron cambios en las celdas.
}

export function randomMatrix(dimensions : { width: number, height: number }): Alive[][] {
    const { width, height } = dimensions
    const matrix: Alive[][] = [];

    for (let i = 0; i < height; i++) {
        const row: Alive[] = [];
        for (let j = 0; j < width; j++) {
            const randomValue = Math.random() < 0.7 ? 0 : 1; // Genera 0 o 1 de forma aleatoria
            row.push(randomValue);
        }
        matrix.push(row);
    }

    return matrix;
}

export function gameTurn (matrix: Alive[][], dimensions: {width: number, height: number}) {

    const newMatrix = matrix.map((row) => [...row]);

    for (let i = 0; i < dimensions.height; i++) {
        for (let j = 0; j < dimensions.width; j++) {
            const aliveNeighbors = aliveNeighborsCounter(matrix, i, j);
            if (matrix[i][j] === 1) {
                // Alive Cell
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    // Die
                    newMatrix[i][j] = 0
                }
            } else {
                // Dead Cell
                if (aliveNeighbors === 3) {
                    // Regenerate cell
                    newMatrix[i][j] = 1
                }
            }
        }
    }

    return newMatrix
}