import { ReactNode } from "react";

export interface LGState {
    dimensions: {
        width: number;
        height: number
    }
}

const initialState: LGState = {
    dimensions: {
        width: 10,
        height: 10
    }
};

export type LGAction =
    | { type: "dimensions/set", payload: LGState['dimensions'] }
    | { type: "sidebar/close" }

export const lgReducer = (state = initialState, action: LGAction) => {
    switch (action.type) {
        case "dimensions/set":
            return { ...state, dimensions: { width: action.payload.width, height: action.payload.height } };

        default:
            return state;
    }
};
