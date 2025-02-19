import { useNavigate } from "react-router-dom";
import { AuthButton, Title } from ".";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between gap-8 p-4 mb-8 bg-white items-center">
      <button className="full-btn-tan" onClick={() => navigate("/recipes")}>Recipes</button>
      <Title />
      <AuthButton />
    </div>
  )
}