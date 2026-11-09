import { offsetLimit } from "@src/core/types/auxiliary-types/pagination.types";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";

const ir = new IngredientRepo();

class GetMyIngredients {
  async execute(
    { offset, limit }: offsetLimit,
    userId: number,
  ): Promise<object> {
    const response = await ir.getMyIngredients({ offset, limit }, userId);
    return response;
  }
}

export default GetMyIngredients;
