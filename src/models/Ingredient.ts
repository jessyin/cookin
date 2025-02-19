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

interface Measurement {
  quantity: number,
  unit: string
}