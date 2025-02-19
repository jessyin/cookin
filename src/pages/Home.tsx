import { useLoaderData } from "react-router-dom";
import { Recipe } from "../models";
import { RecipeCard } from "../components";

export default function Home() {
  const recipes = useLoaderData<Recipe[]>();

  return (
    <div className="flex flex-col mx-auto max-w-1/3 items-center gap-4">
      <h2 className="text-6xl"><span className="text-2xl">( ˘▽˘)っ♨</span> Try this? <span className="text-2xl">~~旦_(- ω-｀｡)</span></h2>
      <RecipeCard recipe={recipes[Math.floor(Math.random() * recipes.length)]}/>
    </div>
  )
}