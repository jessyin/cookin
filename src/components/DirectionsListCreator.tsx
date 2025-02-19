import { EmojiCarousel, TrashIcon } from ".";

type DirectionsListCreatorProps = {
  directions: string[];
  setDirections: (directions: string[]) => void;
};

export default function DirectionsListCreator({
  directions,
  setDirections,
}: DirectionsListCreatorProps) {
  const addNewDirection = () => {
    const newDirections = [...directions, ""];
    setDirections(newDirections);
  };

  const removeDirection = (index: number) => {
    const newDirections = [...directions];
    newDirections.splice(index, 1);
    setDirections(newDirections);
  };

  const onEditDirection = (index: number, value: string) => {
    const newDirections = [...directions];
    newDirections[index] = value;
    setDirections(newDirections);
  };

  return (
    <div className="flex flex-col">
      <h2>Directions <EmojiCarousel type="utensils" /></h2>
      {directions.map((step, index) => (
        <div key={index} className="flex flex-row">
          <div className="flex flex-row input-txt">
            <p className="me-1">{`${index + 1}.`}</p>
            <textarea
              className="bg-transparent outline-none w-full pointer-events-auto"
              rows={1}
              value={step}
              onChange={(event) => onEditDirection(index, event.target.value)}
            />
          </div>
          <div onClick={() => removeDirection(index)}>
            <TrashIcon styles="input-trash" />
          </div>
        </div>
      ))}
      <button className="placeholder-btn-tan mt-2" onClick={addNewDirection}>
        Add +
      </button>
    </div>
  );
}
