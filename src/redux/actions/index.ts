import { Action, SET_USER } from "../types/index";
import { User } from "types/user";

export const setUser = (user: User): Action => ({
  type: SET_USER,
  user,
});

const res = null;
export default res;
