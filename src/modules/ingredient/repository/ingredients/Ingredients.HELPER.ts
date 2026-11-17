import Forbidden from "@src/core/errors/Forbidden.error";
import NotFound from "@src/core/errors/NotFound.error";
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

  async getAccessibleIngredient(
    ingredientId: number,
    userId: number,
  ): Promise<IngredientModel> {
    const ingredient = await ingredientModel.findByPk(ingredientId);

    if (!ingredient) throw new NotFound("Esse ingrediente não existe");

    if (ingredient.isPublic === false && ingredient.userId !== userId)
      throw new Forbidden();

    return ingredient;
  }
}

export default IngredientHelper;
