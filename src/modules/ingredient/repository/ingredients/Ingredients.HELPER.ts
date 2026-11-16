import { IngredientModel } from "@src/core/types/ingredient/Ingredient.types";
import models from "@src/database/models";
import { WhereOptions } from "sequelize";
const ingredientModel = models.ingredient;

class IngredientHelper {
  async findUsersIngredient(
    where: WhereOptions,
  ): Promise<IngredientModel | null> {
    return await ingredientModel.findOne({ where });
  }
}

export default IngredientHelper;
