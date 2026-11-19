import { getPantryIngredientsSwagger } from "./pantryIngredients/getPantryIngredients.swagger";
import { createPantryIngredientSwagger } from "./pantryIngredients/createPantryIngredient.swagger";
import { updatePantryIngredientSwagger } from "./pantryIngredients/updatePantryIngredient.swagger";

export const pantryIngredientsSwagger = {
  paths: {
    "/pantry/{pantryId}/ingredients": {
      ...getPantryIngredientsSwagger.paths["/pantry/{pantryId}/ingredients"],
      ...createPantryIngredientSwagger.paths["/pantry/{pantryId}/ingredients"],
    },

    "/pantry/{pantryId}/ingredient/{ingredientId}": {
      ...updatePantryIngredientSwagger.paths[
        "/pantry/{pantryId}/ingredient/{ingredientId}"
      ],
    },
  },
};
