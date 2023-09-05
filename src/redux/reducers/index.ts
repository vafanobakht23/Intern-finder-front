import { SET_USER, State, Action, SET_TOKEN } from "../types";

const initialState: State = {
  user: undefined,
  token: undefined,
};
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
export default reducer;
