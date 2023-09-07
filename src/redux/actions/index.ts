import { Action, SET_EXPERIENCE, SET_TOKEN, SET_USER } from "../types/index";
import { User } from "../../types/User";
import { Experience } from "types/Experience";

export const setUser = (user: User): Action => ({
  type: SET_USER,
  user,
});

export const setToken = (token: string): Action => ({
  type: SET_TOKEN,
  token,
});
export const setExperience = (experience: Experience[]): Action => ({
  type: SET_EXPERIENCE,
  experience,
});
const res = null;
export default res;
