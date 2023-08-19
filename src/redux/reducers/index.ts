import { SET_USER, State, Action } from "../types";

const initialState: State = {
  user: undefined,
};
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;
