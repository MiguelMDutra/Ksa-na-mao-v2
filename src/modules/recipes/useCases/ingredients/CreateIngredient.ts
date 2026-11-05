import BadRequest from "@src/core/errors/BadRequest.error";
import { createIngredient, Ingredient } from "@src/core/types/Ingredient.types";
import IngredientRepo from "../../repository/ingredients/Ingredient.repository";
const ir = new IngredientRepo();

class CreateIngredient {
  async execute(data: createIngredient): Promise<Ingredient> {
    if (data.name) {
      const response = await ir.createIngredient(data);
      return response;
    }
    throw new BadRequest("O ingrediente precisa de um nome");
  }
}

export default CreateIngredient;
