import { Experience } from "./Experience";
import { Skill } from "./Skill";
import { User } from "./User";

export type Store = {
  user: User;
  token: string;
  experience: Experience[];
  skill: Skill[];
};
