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