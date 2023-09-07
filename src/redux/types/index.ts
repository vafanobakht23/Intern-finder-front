import { Experience } from "types/Experience";
import { User } from "../../types/User";

export interface State {
  user?: User;
  token?: string;
  experience?: Experience[];
}

export interface Action {
  user?: User;
  type: string;
  token?: string;
  experience?: Experience[];
}

export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
export const SET_EXPERIENCE = "SET_EXPERIENCE";
