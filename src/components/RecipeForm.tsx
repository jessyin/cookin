import { ChangeEvent, useContext, useState } from "react";
import { Ingredient, Recipe } from "../models";
import {
  DirectionsListCreator,
  ImagePickerButton,
  IngredientsListCreator,
  TagInput,
  XIcon,
} from ".";
import { uploadPhoto } from "../utils/pickerUtils";
import { RecipeContext } from "../app/contexts";
import { addRecipe, editRecipe, editRecipeContext } from "../utils/firebaseUtils";
import { useNavigate } from "react-router-dom";

export default function RecipeForm({ recipe, onClose }: { recipe?: Recipe; onClose: () => void }) {
  const { tags, pantry, setTags, setPantry } = useContext(RecipeContext);
  const navigate = useNavigate();

  const [name, setName] = useState<string>(recipe?.name || "");
  const [cooktime, setCooktime] = useState<number>(recipe?.cooktime || 0);
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe?.ingredients || []); // TODO: setup a set of ingredients to recommend based on asset availability
  const [directions, setDirections] = useState<string[]>(recipe?.directions || []);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(recipe?.tags || new Set());
  const [imageData, setImageData] = useState(recipe?.image || "");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(recipe?.source || "");

  const getRecipe: (imageUrl: string) => Recipe = (imageUrl) => ({
    name,
    tags: selectedTags,
    cooktime,
    ingredients,
    directions,
    image: imageUrl,
    source,
  });

  const updateRecipeContexts = () => {
    // format new pantry and set context
    // tags have already been added to the context
    const newPantry = new Set<string>([...pantry]);
    ingredients.forEach((ingredient) => {
      if (ingredient.name) newPantry.add(ingredient.name);
    });
    if (newPantry.size != pantry.size) setPantry(newPantry);

    // upload to db
    editRecipeContext({ tags, pantry: newPantry, setTags, setPantry });
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const onCooktimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCooktime(event.target.valueAsNumber);
  };

  const onCreateRecipe = async () => {
    setLoading(true);

    // upload the image
    const imageUrl = imageData && (await uploadPhoto(imageData));
    // console.log("Uploaded image: %s", imageUrl);

    // not blocking -- update the recipe context with new ingredients, and exit
    updateRecipeContexts();

    // upload to firestore
    const recipe = getRecipe(imageUrl);

    try {
      await addRecipe(recipe);
      navigate(".", { replace: true });
    } finally {
      // done
      setLoading(false);
      onClose();
    }
  };

  const onEditRecipe = async () => {
    setLoading(true);

    let imageUrl = recipe?.image;
    if (imageData != imageUrl) {
      imageUrl = imageData && (await uploadPhoto(imageData));
    }

    updateRecipeContexts();

    const newRecipe = getRecipe(imageUrl);

    try {
      if (recipe?.metadata?.id) {
        await editRecipe(recipe?.metadata?.id, newRecipe);
        navigate(".", { replace: true });
      } else {
        alert("something went wrong... try again?");
      }
    } finally {
      // done
      setLoading(false);
      onClose();
    }
  };

  const recipeValid =
    name.length != 0 && directions.length != 0 && ingredients.length != 0 && cooktime > 0;

  return (
    <div className="z-10 fixed inset-0 bg-black/40 flex min-h-full items-center justify-center">
      {loading && (
        <div className="z-30 fixed inset-0 bg-white/50 min-h-full content-center justify-center pointer-events-none">
          <div className="m-auto max-w-fit max-h-fit animate-bounce text-8xl">👩‍🍳🔥🥘</div>
        </div>
      )}
      <div className="relative flex flex-col w-1/2 z-20 max-h-3/4 rounded-lg bg-white shadow-xl">
        <button onClick={onClose}>
          <XIcon styles="size-4 text-dark-gray absolute top-3 right-3 hover:text-red-1 hover:cursor-pointer active:text-red-dark" />
        </button>
        <div className="p-4 overflow-y-auto pb-12">
          <h1 className="mt-2 pb-4">Yes, chef?</h1>
          <div className="grid grid-cols-2 gap-12">
            <ImagePickerButton selectedImage={imageData} onSelectImage={setImageData} />
            <div className="flex flex-col h-fit">
              <input
                className="input-txt text-2xl"
                type="text"
                placeholder="Recipe name"
                onChange={onNameChange}
                value={name}
              />
              <div className="flex flex-row items-center gap-2">
                <b>Cooktime:</b>
                <input
                  className="number-picker"
                  min={0}
                  max={9999}
                  type="number"
                  onChange={onCooktimeChange}
                  value={cooktime.toString()}
                />
                min
              </div>
              <input
                className="input-txt"
                type="text"
                placeholder="https://www.source.com"
                onChange={onSourceChange}
                value={source}
              />
              <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
            <IngredientsListCreator ingredients={ingredients} setIngredients={setIngredients} />
            <DirectionsListCreator directions={directions} setDirections={setDirections} />
          </div>
        </div>
        <div className="p-4 rounded-b-lg shadow-inner bg-light-gray/20">
          <button
            className="full-btn-blue w-full"
            onClick={(recipe && onEditRecipe) || onCreateRecipe}
            disabled={!recipeValid}
          >
            {(recipe && "Edit Recipe") || "Create Recipe!"}
          </button>
        </div>
      </div>
    </div>
  );
}
