import { OffsetLimit } from "@src/core/types/auxiliary-types/options/pagination.types";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";

const ir = new IngredientRepo();

class GetAllIngredients {
  async execute(
    { offset, limit }: OffsetLimit,
    userId: number,
  ): Promise<object> {
    const response = await ir.getAllIngredients({ offset, limit }, userId);
    return response;
  }
}

export default GetAllIngredients;
