import { createContext } from "react";
import { Tag, User } from "../models";

type AuthContext = {
  user: User | null,
  signin: () => void,
  signout: () => void
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  signin: () => {},
  signout: () => {}
});

export type RecipeContext = {
  tags: Set<Tag>,
  setTags: (tags: Set<Tag>) => void,
  pantry: Set<string>,
  setPantry: (pantry: Set<string>) => void,
};

export const RecipeContext = createContext<RecipeContext>({
  tags: new Set(),
  setTags: () => {},
  pantry: new Set(),
  setPantry: () => {},
});
