import { Action, SET_TOKEN, SET_USER } from "../types/index";
import { User } from "../../types/User";

export const setUser = (user: User): Action => ({
  type: SET_USER,
  user,
});

export const setToken = (token: string): Action => ({
  type: SET_TOKEN,
  token,
});
const res = null;
export default res;
