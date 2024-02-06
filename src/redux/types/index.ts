import { Experience } from "types/Experience";
import { Skill } from "types/Skill";
import { User } from "types/User";

export interface State {
  user?: User;
  token?: string;
  experience?: Experience[];
  skill?: Skill[];
}

export interface Action {
  user?: User;
  type: string;
  token?: string;
  experience?: Experience[];
  skill?: Skill[];
}

export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_EXPERIENCE = "SET_EXPERIENCE";
export const SET_SKILL = "SET_SKILL";
