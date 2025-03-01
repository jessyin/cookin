import { Ingredient } from ".";

export interface RecipeMetadata {
  id?: string; // from firebase
  timestamp?: number; // last updated in unix epoch ms
}

export default class Recipe {
  constructor(
    public metadata?: RecipeMetadata, // added during creation
    public name: string = "",
    public tags: Set<string> = new Set(),
    public cooktime: number = 0, // in minutes
    public ingredients: Ingredient[] = [],
    public directions: string[] = [],
    public image?: string,
    public source?: string
  ) {}

  toString = () => JSON.stringify(this, null, " ");
}
