import { useLoaderData, useNavigate } from "react-router-dom";
import { Recipe } from "../models";
import { EmojiCarousel, PillList, RecipeForm, TrashIcon } from "../components";
import { useContext, useState } from "react";
import { AuthContext } from "../app/contexts";
import { deleteRecipe } from "../utils/firebaseUtils";
import { createPortal } from "react-dom";

export default function FullRecipe() {
  const recipe = useLoaderData<Recipe>();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  // console.log("FullRecipe: %s", recipe.toString());

  const onDelete = () => {
    if (!auth.user) {
      return;
    }

    const confirmation = confirm("are you sure you want to delete this recipe?");
    if (confirmation && recipe.metadata && recipe.metadata.id) {
      deleteRecipe(recipe.metadata.id);
      navigate(-1);
    }
  };

  const onEdit = () => {
    setShowModal(true);
  };

  return (
    <div className="max-w-3/4 h-fit m-auto mb-12 paper">
      {auth.user && (
        <div className="absolute top-0 right-0 m-4 flex flex-row gap-2">
          <button className="full-btn-blue" onClick={onEdit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 my-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button className="full-btn-red" onClick={onDelete}>
            <TrashIcon styles={"size-4 my-2"} />
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-12">
        <img src={recipe.image} />
        <div className="basis-1/2 flex flex-col content-end">
          <h1 className="text-stone-700">{recipe.name}!</h1>
          <div className="flex flex-row flex-wrap mb-8 -mt-2">
            <p className="text-3xl my-auto mr-2 rotate-45">🏷️</p><PillList tags={recipe.tags} />
          </div>
          <p className="pb-2"><b>Cooktime:</b> {recipe.cooktime} min</p>
          <div className="pb-8">
            <h2 className="border-b-2 border-b-green">
              Ingredients <EmojiCarousel type="ingredients" />
            </h2>
            <ul className="list-disc ps-4">
              {recipe.ingredients?.map((ingredient) => (
                <li><b>{ingredient.measurement.quantity} {ingredient.measurement.unit || ""}</b> {ingredient.name.toLowerCase()}</li>
              ))}
            </ul>
          </div>
          <div className="py-8">
            <h2 className="border-b-2 border-b-green">
              Instructions <EmojiCarousel type="utensils" />
            </h2>
            <ol className="list-decimal ps-4">
              {recipe.directions?.map((step) => (
                <li>{step}</li>
              ))}
            </ol>
          </div>
          <div className="text-blue-dark-2">
            <b>Source:</b> <a href={recipe.source || "#"}>{recipe.source || "a family recipe :P"}</a>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <RecipeForm recipe={recipe} onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}
