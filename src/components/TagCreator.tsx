import { useState } from "react";
import Pill, { COLORS } from "./Pill";

type TagCreatorProps = {
  text: string,
  onCreate: (name: string, color: string) => void
  onClose: () => void
};

export default function TagCreator({ text, onCreate, onClose }: TagCreatorProps) {
  const [selected, setSelected] = useState("");

  const selectColor = (color: string) => {
    setSelected(color);
  }

  const onCreateClick = () => { 
    onCreate(text, selected)
    onClose();
  }

  return (
    <div className="absolute z-20 bg-white w-fit rounded-md border-2 border-light-gray shadow-md p-2">
      <Pill text={text} color={selected} placeholder="...hungy..." />
      <div className="flex flex-row gap-2">
        {Array.from(COLORS.entries()).map(([k]) => (
          <button key={k} className="rounded-full w-4 h-4 border-2" style={{ backgroundColor: k, borderColor: selected == k && "#33333333" || "transparent" }} onClick={() => selectColor(k)} />
          ))}
      </div>
      <button className="full-btn-blue mt-2" disabled={text == "" || selected == ""} onClick={onCreateClick}>Create Tag</button>
      <button className="mx-3 text-blue-1 underline-offset-4 hover:underline hover:text-blue-2 active:text-blue-dark" onClick={onClose}>Close</button>
    </div>
  );
}
