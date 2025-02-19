import { Recipe } from "../models";
import { RecipeCard } from "./";

interface RecipeGalleryProps {
  recipes: Recipe[]
}

export default function RecipeGallery(props: RecipeGalleryProps) {
  const { recipes } = props; 
  return (
    <div className="grid grid-cols-3 gap-4">
      { recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.metadata?.id || 0} />) }
    </div>
  )
}