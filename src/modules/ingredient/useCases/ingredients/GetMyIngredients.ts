import { OffsetLimit } from "@src/core/types/auxiliary-types/options/pagination.types";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";

const ir = new IngredientRepo();

class GetMyIngredients {
  async execute(
    { offset, limit }: OffsetLimit,
    userId: number,
  ): Promise<object> {
    const response = await ir.getMyIngredients({ offset, limit }, userId);
    return response;
  }
}

export default GetMyIngredients;
