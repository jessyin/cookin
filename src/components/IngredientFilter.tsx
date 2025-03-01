import { useContext } from "react";
import { RecipeContext } from "../app/contexts";
import PillList from "./PillList";

export default function IngredientFilter() {
  const { pantry } = useContext(RecipeContext);

  return (
    <div className="flex flex-col">
      <h2>Ingredients</h2>
      <div className="flex flex-row flex-wrap">
        <PillList tags={pantry} />
      </div>
    </div>
  );
}
