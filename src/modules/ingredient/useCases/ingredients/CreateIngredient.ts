import BadRequest from "@src/core/errors/BadRequest.error";
<<<<<<< HEAD:src/modules/recipes/useCases/ingredients/CreateIngredient.ts
import {
  IngredientCreate,
  IngredientModel,
} from "@src/core/types/ingredient/Ingredient.types";
import IngredientRepo from "../../repository/ingredients/Ingredient.repository";
=======
import { createIngredient, Ingredient } from "@src/core/types/Ingredient.types";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";
>>>>>>> fb93570d006f92a652929e12050822ec710b150a:src/modules/ingredient/useCases/ingredients/CreateIngredient.ts
const ir = new IngredientRepo();

class CreateIngredient {
  async execute(data: IngredientCreate): Promise<IngredientModel> {
    if (data.name) {
      const response = await ir.createIngredient(data);
      return response;
    }
    throw new BadRequest("O ingrediente precisa de um nome");
  }
}

export default CreateIngredient;
