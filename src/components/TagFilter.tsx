import { useContext } from "react"
import { RecipeContext } from "../app/contexts";
import PillList from "./PillList";

export default function TagFilter() {
  const { tags } = useContext(RecipeContext);

  return (
    <div className="flex flex-col">
      <h2>Tags</h2>
      <div className="flex flex-row flex-wrap"><PillList tags={tags}/></div>
    </div>
  )
}