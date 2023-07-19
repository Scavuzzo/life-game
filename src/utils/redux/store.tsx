'use client';

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, UIState, UIAction, lgReducer, LGState, LGAction } from "./reducers";

export interface RootState {
  ui: UIState;
  lg: LGState;
}

type RootAction = 
  | UIAction
  | LGAction;

const reducer: any = combineReducers({
  ui: uiReducer,
  lg: lgReducer
});

export const store = configureStore<RootState, RootAction>({
  reducer,
  devTools: true,
});

