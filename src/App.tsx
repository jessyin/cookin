import { ProvideAuth } from "./components";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Cookbook, ErrorPage, Home, FullRecipe } from "./pages";
import { cookbookLoader, recipeLoader } from "./app/loaders";
import Root from "./pages/Root";
import ProvideRecipeContext from "./components/ProvideRecipeContext";

export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: cookbookLoader,
        },
        {
          path: "/recipes/",
          element: <Cookbook />,
          loader: cookbookLoader,
        },
        {
          path: "/recipes/:id",
          element: <FullRecipe />,
          loader: recipeLoader,
        },
      ],
    },
  ]);

  return (
    <ProvideAuth>
      <ProvideRecipeContext>
        <RouterProvider router={router} />
      </ProvideRecipeContext>
    </ProvideAuth>
  );
}
