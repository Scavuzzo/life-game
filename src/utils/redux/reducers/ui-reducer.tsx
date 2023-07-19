import { ReactNode } from "react";

export interface UIState {
  sidebar: boolean;
  loading: boolean;
  modal: {
    open: boolean;
    content: ReactNode
  };
  alert: {
    open: boolean;
    message: string;
    type: "success" | "error" | "info";
  },
  backdrop: boolean;
}

const initialState: UIState = {
  sidebar: false,
  loading: false,
  modal: {
    open: false,
    content: null,
  },
  alert: {
    open: false,
    type: 'info',
    message: ''
  },
  backdrop: false
};

export type UIAction =
  | { type: "sidebar/open" }
  | { type: "sidebar/close" }
  | { type: "loading/true" }
  | { type: "loading/false" }
  | { type: "modal/open", payload: UIState['modal'] }
  | { type: "modal/close" }
  | { type: "alert/open", payload: UIState['alert'] }
  | { type: "alert/close"}
  | { type: "backdrop/close"}

export const uiReducer = (state = initialState, action: UIAction) => {
  switch (action.type) {
    case "sidebar/open":
      return { ...state, sidebar: true };

    case "sidebar/close":
      return { ...state, sidebar: false };
      
    case "loading/true":
      return { ...state, backdrop: true, loading: true };
        
    case "loading/false":
      return { ...state, backdrop: false, loading: false };
      
    case "modal/open":
      return { ...state, backdrop: true, modal: { open: true, content: action.payload.content} };

    case "modal/close":
      return { ...state, backdrop: false, modal: { open: false , content: state.modal.content} };
        
    case "alert/open":
      return { ...state, alert: { open: true, type: action.payload.type ?? 'info', message: action.payload.message } };

    case "alert/close":
      return { ...state, alert: initialState.alert };

    case "backdrop/close":
      return { modal: {open: false, content: state.modal.content}, loading: state.loading}

    default:
      return state; 
  }
};
