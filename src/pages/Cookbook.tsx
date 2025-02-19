import { useLoaderData } from "react-router-dom";
import { Recipe } from "../models";
import { IngredientFilter, RecipeCard, RecipeForm, TagFilter } from "../components";
import { useContext, useState } from "react";
import { AuthContext } from "../app/contexts";
import { createPortal } from "react-dom";

export default function Cookbook() {
  // Search, sort of all recipes in one spot.
  // Add recipe functionality
  const recipes = useLoaderData<Recipe[]>();
  const auth = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const openAddRecipeModal = () => {
    setShowModal(true); 
  }

  return (
    <div className="flex flex-row max-w-1/2 mx-auto">
      <div className="basis-1/5 bg-stone-300 rounded-lg p-4">
        <TagFilter/>
        <div className="m-6" />
        <IngredientFilter />
      </div>
      <div className="basis-4/5 p-8">
        <div className="flex flex-row justify-between mb-2 items-center">
          <h1 className="text-stone-600">cookbook</h1>
          { auth.user && <button className="full-btn-blue" onClick={openAddRecipeModal}>+ Add</button> }
        </div>
        <div className="grid grid-cols-3 gap-3">
          { recipes.map((recipe) => (<RecipeCard recipe={recipe} />))}
        </div>
      </div>
      { showModal && createPortal(<RecipeForm onClose={() => setShowModal(false)}/>, document.body)}
    </div>
  );
}