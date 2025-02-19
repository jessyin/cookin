import { useNavigate } from "react-router-dom";
import { PhotoIcon, PillList } from ".";
import { Recipe } from "../models";

interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * Brief preview of a recipe. Purpose is to provide vibes.
 */
export default function RecipeCard(props: RecipeCardProps) {
  const { recipe } = props;
  const navigate = useNavigate();
  const urlParts = recipe?.image != "" && recipe.image?.split("upload/");

  const onClick = () => {
    navigate(`/recipes/${recipe.metadata?.id}`);
  };
  // console.log("RecipeCard: %s", recipe.toString());

  return (
    <div
      key={`card-${recipe?.metadata?.id}`}
      className="flex flex-col shadow rounded-md p-3 bg-white hover:animate-wiggle hover:shadow-tan-1 hover:shadow-md hover:cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-center">{recipe?.name || ""}</h2>
      {urlParts && <img className="" src={`${urlParts[0]}upload/ar_1.0,c_fill/${urlParts[1]}`} />}
      {!urlParts && (
        <div>
          <PhotoIcon style="text-dark-gray/50"/>
        </div>
      )}
      <div className="flex flex-row flex-wrap">
        <PillList tags={recipe.tags} />
      </div>
    </div>
  );
}
