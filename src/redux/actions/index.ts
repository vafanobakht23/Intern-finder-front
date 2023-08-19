import { Action, SET_USER } from "redux/types";
import { User } from "types/user";

export const setUser = (user: User): Action => ({
  type: SET_USER,
  user,
});

const res = null;
export default res;
