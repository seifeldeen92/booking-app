import * as uiActions from "../actions/ui";

type uiAction = { type: string; payload?: boolean };

const initialState = {
  loading: true,
};

export default (
  state: { loading: boolean } = initialState,
  action: uiAction
) => {
  switch (action.type) {
    case uiActions.PAGE_LOADED:
    case uiActions.SET_LOADING_ON:
    case uiActions.SET_LOADING_OFF:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
