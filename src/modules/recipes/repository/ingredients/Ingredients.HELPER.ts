import { Ingredient } from "@src/core/types/Ingredient.types";
import models from "@src/database/models";
import { WhereOptions } from "sequelize";
const ingredientModel = models.ingredient;

class IngredientHelper {
  async findUsersIngredient(where: WhereOptions): Promise<Ingredient | null> {
    return await ingredientModel.findOne({ where });
  }
}

export default IngredientHelper;
