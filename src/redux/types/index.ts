import { User } from "types/user";

export interface State {
  user?: User;
}

export interface Action {
  user?: User;
  type: string;
}

export const SET_USER = "SET_USER";
