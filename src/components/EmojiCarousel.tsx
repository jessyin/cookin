import { useEffect, useState } from "react"

function getEmojis(type?: string) {
  switch (type) {
    case "utensils":
      return ["🍳", "🥄", "🍽️", "🥢", "🥣", "🔥", "🥘", "👩‍🍳", "⏲️"];
    case "ingredients":
    default:
      return ["🍎", "🍌", "🍐", "🍊", "🍋", "🍉", "🍓", "🥑", "🥦", "🥬", "🥒", "🌽", "🫑", "🌶️", "🥕", "🧄", "🧅", "🥔", "🍠", "🫚", "🥯", "🍞", "🥖", "🧀", "🥚", "🧈", "🥓", "🥩", "🍗", "🍚", "🍫", "🍾"];
  }

}

export default function EmojiCarousel({ type }: { type?: string }) {
  const [index, setIndex] = useState(0);
  const emojis = getEmojis(type);

  useEffect(() => {
    const interval = setInterval(() => setIndex(Math.floor(Math.random() * emojis.length)), 1000);
    return () => {
      clearInterval(interval);
    }
  })

  return (
    <>{emojis[index]}</>
  )
}