import { Params } from "react-router-dom";
import { fetchRecipe, fetchRecipes } from "../utils/firebaseUtils";

export async function cookbookLoader() {
  return fetchRecipes();
}

export async function recipeLoader({ params }: { params: Params<"id">}) {
  return params.id && fetchRecipe(params.id);
}
