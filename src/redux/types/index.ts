import { User } from "../../types/User";

export interface State {
  user?: User;
  token?: string;
}

export interface Action {
  user?: User;
  type: string;
  token?: string;
}

export const SET_USER = "SET_USER";
export const SET_TOKEN = "SET_TOKEN";
