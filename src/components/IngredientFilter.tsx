import { useContext } from "react";
import { RecipeContext } from "../app/contexts";
import PillList from "./PillList";
import { Tag } from "../models";

export default function IngredientFilter() {
  const { pantry } = useContext(RecipeContext);

  const pantryTags = new Set<Tag>();
  pantry.forEach((ingredient) => pantryTags.add(new Tag(ingredient)));

  return (
    <div className="flex flex-col">
      <h2>Ingredients</h2>
      <div className="flex flex-row flex-wrap">
        <PillList tags={pantryTags} />
      </div>
    </div>
  );
}
