import { createContext } from "react";
import { User } from "../models";

type AuthContext = {
  user: User | null;
  signin: () => void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  signin: () => {},
  signout: () => {},
});

export type RecipeContext = {
  tags: Map<string, string>;
  setTags: (tags: Map<string, string>) => void;
  pantry: Set<string>;
  setPantry: (pantry: Set<string>) => void;
};

export const RecipeContext = createContext<RecipeContext>({
  tags: new Map<string, string>(),
  setTags: () => {},
  pantry: new Set(),
  setPantry: () => {},
});
