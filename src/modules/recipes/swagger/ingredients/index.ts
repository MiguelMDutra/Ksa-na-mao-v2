import { createIngredient } from "./createIngredient.swagger";
import { updateIngredient } from "./updateIngredient.swagger";

export const ingredientSwagger = {
  paths: {
    ...createIngredient.paths,
    ...updateIngredient.paths,
  },
};
