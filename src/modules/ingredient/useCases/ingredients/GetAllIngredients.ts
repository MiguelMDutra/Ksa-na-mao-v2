import { offsetLimit } from "@src/core/types/auxiliary-types/pagination.types";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";

const ir = new IngredientRepo();

class GetAllIngredients {
  async execute(
    { offset, limit }: offsetLimit,
    userId: number,
  ): Promise<object> {
    const response = await ir.getAllIngredients({ offset, limit }, userId);
    return response;
  }
}

export default GetAllIngredients;
