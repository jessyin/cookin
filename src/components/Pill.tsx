export const COLORS = new Map([
  ["#f6bd60", "white"], // orange
  ["#f7d5a1", "#000A"], // light orange
  ["#f6dcd3", "#000A"], // pale pink
  ["#f5cac3", "#000A"], // pink
  ["#bdb8b0", "white"], // gray green
  ["#84a59d", "white"], // green
  ["#bb9590", "white"], // mauve
  ["#f28482", "white"], // salmon
]);

type PillProps = {
  text: string;
  color?: string;
  placeholder?: string;
  onCancel?: (name: string) => void;
  onClick?: () => void;
};

export default function Pill({ text, color, placeholder, onCancel, onClick }: PillProps) {
  return (
    <div
      className="flex flex-row rounded-full px-2 me-2 my-2 w-fit h-fit text-sm"
      style={{
        backgroundColor: color || "transparent",
        color: (placeholder && !text && "#33333333") || (color && COLORS.get(color)),
        borderStyle: "solid",
        borderColor: (color && "transparent") || "#33333333",
        borderWidth: "2px",
        cursor: (onClick && "pointer") || "auto",
      }}
      onClick={onClick}
    >
      <p>{text || placeholder}</p>
      {onCancel && (
        <button className="ms-2 my-auto size-4 text-black/30 hover:text-white active:text-black/50" onClick={() => onCancel(text)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
