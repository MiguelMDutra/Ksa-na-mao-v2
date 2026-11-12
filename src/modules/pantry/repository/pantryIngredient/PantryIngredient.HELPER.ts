import { PantryIngredientModel } from "@src/core/types/pantry/PantryIngredient.types";
import models from "@src/database/models";
import { Transaction } from "sequelize";
const pantryIngredientModel = models.pantryIngredient;

class PantryIngredientHelper {
  async findOneIngredient(
    ingredientId: number,
    pantryId: number,
    t?: Transaction,
  ): Promise<PantryIngredientModel | null> {
    const response = await pantryIngredientModel.findOne({
      where: {
        ingredientId: ingredientId,
        pantryId: pantryId,
      },
      transaction: t,
    });
    return response;
  }
}

export default PantryIngredientHelper;
