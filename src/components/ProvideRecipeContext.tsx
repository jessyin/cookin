import { ReactNode, useEffect, useState } from "react";
import { Tag } from "../models";
import { RecipeContext } from "../app/contexts";
import { fetchRecipeContext } from "../utils/firebaseUtils";

export default function ProvideRecipeContext({ children } : { children?: ReactNode }) {
  const [tags, setTags] = useState<Set<Tag>>(new Set());
  const [pantry, setPantry] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRecipeContext().then((context) => {
      if (context) {
        setTags(context.tags);
        setPantry(context.pantry);
      }
    });
  }, [])

  const recipeContext = {
    tags,
    setTags,
    pantry,
    setPantry
  };

  return (
    <RecipeContext.Provider value={recipeContext}>{children}</RecipeContext.Provider>
  )
}