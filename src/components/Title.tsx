import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../app/contexts";
import EmojiCarousel from "./EmojiCarousel";

/**
 * Fun interactive header component
 */
export default function Title() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [animationStyleL, setAnimationStyleL] = useState("");
  const [animationStyleR, setAnimationStyleR] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onClick = () => {
    navigate("/");
    setAnimationStyleL("animate-explode-l");
    setAnimationStyleR("animate-explode-r");
    if (!timeoutId) {
      const id = setTimeout(() => {
        setAnimationStyleL("");
        setAnimationStyleR("");
        setTimeoutId(null);
      }, 1250);
      setTimeoutId(id);
    }
  };

  return (
    <div className="group flex flex-row gap-4 cursor-pointer items-center" onClick={onClick}>
      <h2 className={animationStyleL}>
        <EmojiCarousel type="ingredients" />
      </h2>
      <h1 className="group-hover:animate-wiggle group-hover:text-blue-2 group-active:text-blue-dark-2 group">
        {(auth.user?.name && `${auth.user?.name.toLowerCase()}, what's cookin'?`) ||
          "what's cookin'?"}
      </h1>
      <h2 className={animationStyleR}>
        <EmojiCarousel type="utensils" />
      </h2>
    </div>
  );
}
