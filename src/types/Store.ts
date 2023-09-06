import { Experience } from "./Experience";
import { User } from "./User";

export type Store = {
  user: User;
  token: string;
  experience: Experience;
};
