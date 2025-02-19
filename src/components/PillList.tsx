import { Pill } from ".";
import { Tag } from "../models";

type PillListProps = {
  tags: Set<Tag>;
  setTags?: (tags: Set<Tag>) => void;
};

export default function PillList({ tags, setTags }: PillListProps) {
  return [...tags].map((tag) => {
    let onCancel;
    if (setTags) {
      onCancel = () => {
        const newTags = new Set(tags);
        newTags.delete(tag);
        setTags(newTags);
      };
    }

    return (<Pill key={tag.name} text={tag.name} color={tag.color} onCancel={onCancel} />);
  });
}
