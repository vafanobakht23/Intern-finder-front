import { User } from "../../types/User";

export interface State {
  user?: User;
}

export interface Action {
  user?: User;
  type: string;
}

export const SET_USER = "SET_USER";
