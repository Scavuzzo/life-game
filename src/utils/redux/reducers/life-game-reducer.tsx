import { Alive } from "@/types";
import { ReactNode } from "react";

export interface LGState {
    matrix: Alive[][];
    dimensions: {
        width: number;
        height: number
    }
}

const initialState: LGState = {
    matrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    dimensions: {
        width: 10,
        height: 10
    }
};

export type LGAction =
    | { type: "dimensions/set"; payload: { width: number, height: number} }
    | { type: "matrix/draw", payload: number[][] }
    | { type: "cell/set", payload: { x: number, y: number } }


export const lgReducer = (state = initialState, action: LGAction) => {
    switch (action.type) {
        case "dimensions/set":
            const { width, height } = action.payload
            return { ...state, dimensions: { width, height } };
        
        case "matrix/draw":
            return { ...state, matrix: action.payload}

        case "cell/set":
            const { x, y } = action.payload;
            const updatedMatrix = state.matrix.map((row, rowIndex) =>
                rowIndex === y ? row.map((cell, columnIndex) => (columnIndex === x ? (cell === 1 ? 0 : 1) : cell)) : row
            );
            return { ...state, matrix: updatedMatrix };
            
        default:
            return state;
    }
};
