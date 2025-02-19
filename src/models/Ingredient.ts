export const UNIT = [
  "", "clove", "slice", "stalk"
];

export const VOLUME = [
  "cup", "pinch", "tb", "ts" 
];

export const WEIGHT = [
  "g", "lb"
]


export default interface Ingredient {
  name: string,
  measurement: Measurement
}

export function isIngredient(obj: unknown): obj is Ingredient {
  return (<Ingredient>obj).name != undefined && (<Ingredient>obj).measurement != undefined;
}

interface Measurement {
  quantity: number,
  unit: string
}