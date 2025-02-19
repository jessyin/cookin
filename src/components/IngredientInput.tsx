import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../app/contexts";

type IngredientInputProps = {
  name: string;
  index: number;
  onEditIngredientName: (index: number, name: string) => void;
};

export default function IngredientInput({
  name,
  index,
  onEditIngredientName,
}: IngredientInputProps) {
  const [autocomplete, setAutocomplete] = useState<Set<string>>(new Set());
  const [isFocus, setIsFocus] = useState(false);
  const { pantry } = useContext(RecipeContext);

  useEffect(() => {
    const newAutoComplete = new Set<string>();
    const escaped = name.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (name.length > 1) {
      pantry.forEach((ingredient) => {
        if (
          ingredient
            .toLowerCase()
            .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            .match(new RegExp(`^${escaped}`, "i")) &&
          ingredient != escaped
        ) {
          newAutoComplete.add(ingredient);
        }
      });
    }
    setAutocomplete(newAutoComplete);
  }, [name, pantry]);

  return (
    <div
      className="relative w-full"
      onFocus={() => setIsFocus(true)}
      onBlur={(e) => e.relatedTarget == null && setIsFocus(false)}
    >
      <input
        className="input-txt"
        type="text"
        key={`${index}-name`}
        value={name.toLowerCase()}
        placeholder="sugar"
        onChange={(event) => onEditIngredientName(index, event.target.value)}
      />
      {autocomplete.size > 0 && isFocus && (
        <div className="absolute flex flex-col max-h-30 overflow-y-scroll z-40 w-full bg-white border-2 border-t-0 border-light-gray shadow-lg">
          {[...autocomplete].map((ingredient) => (
            <button
              key={ingredient}
              className="cursor-pointer ps-2 py-1 text-start w-full border-b-2 border-light-gray hover:bg-light-gray"
              onClick={() => onEditIngredientName(index, ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
