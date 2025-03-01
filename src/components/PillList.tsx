import { useContext } from "react";
import { Pill } from ".";
import { RecipeContext } from "../app/contexts";

type PillListProps = {
  tags: Set<string>;
  setTags?: (tags: Set<string>) => void;
};

export default function PillList({ tags, setTags }: PillListProps) {
  const allTags = useContext(RecipeContext).tags;

  return [...tags].map((tag) => {
    let onCancel;
    if (setTags) {
      onCancel = () => {
        const newTags = new Set(tags);
        newTags.delete(tag);
        setTags(newTags);
      };
    }

    return <Pill key={tag} text={tag} color={allTags.get(tag)} onCancel={onCancel} />;
  });
}
