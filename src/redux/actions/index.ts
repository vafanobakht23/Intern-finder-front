import {
  Action,
  SET_EXPERIENCE,
  SET_SKILL,
  SET_TOKEN,
  SET_USER,
} from "../types/index";
import { Experience } from "types/Experience";
import { Skill } from "types/Skill";
import { User } from "types/User";

export const setUser = (user: User | undefined): Action => ({
  type: SET_USER,
  user,
});

export const setToken = (token: string | undefined): Action => ({
  type: SET_TOKEN,
  token,
});
export const setExperience = (experience: Experience[]): Action => ({
  type: SET_EXPERIENCE,
  experience,
});
export const setSkill = (skill: Skill[]): Action => ({
  type: SET_SKILL,
  skill,
});
const res = null;
export default res;
