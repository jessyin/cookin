import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Tag } from "../models";
import { Pill, PillList, TagCreator } from ".";
import { RecipeContext } from "../app/contexts";

type TagInputProps = {
  selectedTags: Set<Tag>;
  setSelectedTags: (tags: Set<Tag>) => void;
};

export default function TagInput({ selectedTags, setSelectedTags }: TagInputProps) {
  const { tags } = useContext(RecipeContext);
  const [query, setQuery] = useState("");
  const [autocomplete, setAutocomplete] = useState<Set<Tag>>(new Set());
  const [showCreator, setShowCreator] = useState<boolean>(false);

  useEffect(() => {
    const newAutocomplete = new Set<Tag>();
    const escaped = query.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    if (query.length != 0) {
      tags.forEach((tag) => {
        if (tag.name.match(new RegExp(`^${escaped}`, "i")) && !selectedTags.has(tag)) {
          newAutocomplete.add(tag);
        }
      });
    }
    setAutocomplete(newAutocomplete);
  }, [query, selectedTags, tags]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const onAddTag = (tag: Tag) => {
    const newTags = new Set(selectedTags);
    newTags.add(tag);
    setSelectedTags(newTags);

    // reset query
    setQuery("");
  };

  const onCreateTag = (name: string, color: string) => {
    onAddTag(new Tag(name, color));
  };

  // if autocomplete, show tag
  // if none, show create tag interface
  return (
    <div>
      <div className="flex flex-row">
        <input
          className="input-txt me-2"
          placeholder="Add a tag..."
          type="text"
          value={query}
          maxLength={30}
          onChange={onChange}
        />
        <button className="placeholder-btn-tan m-auto px-2 rounded-full border-solid" onClick={() => setShowCreator(true)}>+</button>
      </div>
      {showCreator && (
        <TagCreator text={query} onCreate={onCreateTag} onClose={() => setShowCreator(false)} />
      )}
      {autocomplete.size != 0 && (
        <div className="absolute max-w-md bg-white border-light-gray border-2 flex flex-row shadow-md z-10 px-4 rounded-md overflow-x-scroll">
          {[...autocomplete].map((tag) => (
            <Pill key={tag.name} text={tag.name} color={tag.color} onClick={() => onAddTag(tag)} />
          ))}
        </div>
      )}

      <div className="h-14 max-h-1/2 flex flex-row overflow-x-scroll">
        <PillList tags={selectedTags} setTags={setSelectedTags} />
      </div>
    </div>
  );
}
