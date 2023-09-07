import {
  SET_USER,
  State,
  Action,
  SET_TOKEN,
  SET_EXPERIENCE,
  SET_SKILL,
} from "../types";

const initialState: State = {
  user: undefined,
  token: undefined,
  experience: undefined,
  skill: undefined,
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
    case SET_EXPERIENCE:
      return {
        ...state,
        experience: action.experience,
      };
    case SET_SKILL:
      return {
        ...state,
        experience: action.experience,
      };
    default:
      return state;
  }
};
export default reducer;
