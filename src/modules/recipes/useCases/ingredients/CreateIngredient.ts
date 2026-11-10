import BadRequest from "@src/core/errors/BadRequest.error";
import {
  CreateIngredient,
  Ingredient,
} from "@src/core/types/ingredient/Ingredient.types";
import IngredientRepo from "../../repository/ingredients/Ingredient.repository";
const ir = new IngredientRepo();

class CreateIngredientClass {
  async execute(data: CreateIngredient): Promise<Ingredient> {
    if (data.name) {
      const response = await ir.createIngredient(data);
      return response;
    }
    throw new BadRequest("O ingrediente precisa de um nome");
  }
}

export default CreateIngredientClass;
