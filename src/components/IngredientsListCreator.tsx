import { Ingredient } from "../models";
import { EmojiCarousel, IngredientInput, TrashIcon } from ".";
import { UNIT, VOLUME, WEIGHT } from "../models/Ingredient";

type IngredientsListCreatorProps = {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
};

export default function IngredientsListCreator({
  ingredients,
  setIngredients,
}: IngredientsListCreatorProps) {
  const onEditIngredientName = (index: number, name: string) => {
    const newIngredients = structuredClone(ingredients);
    newIngredients[index].name = name.toLowerCase();
    setIngredients(newIngredients);
  };

  const onEditIngredientUnit = (index: number, unit: string) => {
    const newIngredients = structuredClone(ingredients);

    newIngredients[index].measurement.unit = unit;
    setIngredients(newIngredients);
  };

  const onEditIngredientQuantity = (index: number, quantity: number) => {
    const newIngredients = structuredClone(ingredients);
    newIngredients[index].measurement.quantity = quantity;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = structuredClone(ingredients);
    newIngredients.splice(index, 1);

    setIngredients(newIngredients);
  };

  const addNewIngredient = () => {
    setIngredients([...structuredClone(ingredients), { name: "", measurement: { quantity: 0, unit: "" } }]);
  };

  const unitDropdown = (index: number) => {
    const isSelectedUnit = (unit: string) => ingredients[index].measurement.unit == unit;

    return (
      <select
        key={`${index}-unit`}
        onChange={(event) => onEditIngredientUnit(index, event.target.value)}
        className="picker"
      >
        <option disabled>- unit -</option>
        {UNIT.map((value) => (
          <option key={`${index}-${value}`} selected={isSelectedUnit(value)}>{value}</option>
        ))}
        <option disabled>- volume -</option>
        {VOLUME.map((value) => (
          <option key={`${index}-${value}`} selected={isSelectedUnit(value)}>{value}</option>
        ))}
        <option disabled>- weight -</option>
        {WEIGHT.map((value) => (
          <option key={`${index}-${value}`} selected={isSelectedUnit(value)}>{value}</option>
        ))}
      </select>
    );
  };

  return (
    <div className="flex flex-col">
      <h2>
        Ingredients <EmojiCarousel type="ingredients" />
      </h2>
      {ingredients.map((ingredient, index) => (
        <div className="flex flex-row">
          <input
            className="number-picker"
            type="number"
            key={`${index}-quantity`}
            min={0}
            max={1000}
            value={ingredient.measurement?.quantity}
            onChange={(event) => onEditIngredientQuantity(index, event.target.valueAsNumber)}
          />
          {unitDropdown(index)}
          <IngredientInput name={ingredient.name} onEditIngredientName={onEditIngredientName} index={index} />
          <div key={`${index}-x`} onClick={() => removeIngredient(index)}>
            <TrashIcon styles="input-trash" />
          </div>
        </div>
      ))}
      <button className="placeholder-btn-tan mt-2" onClick={addNewIngredient}>
        Add +
      </button>
    </div>
  );
}
