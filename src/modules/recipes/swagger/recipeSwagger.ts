import { ingredientSwagger } from "./ingredients/index";

export const recipeSwagger = {
  paths: {
    ...ingredientSwagger.paths,
  },
};
