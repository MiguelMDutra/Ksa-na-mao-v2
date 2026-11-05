import Conflict from "@src/core/errors/Conflict.error";
import {
  updateIngredient,
  createIngredient,
  Ingredient,
} from "@src/core/types/Ingredient.types";
import models from "@src/database/models";
import { WhereOptions } from "sequelize";
const ingredientModel = models.ingredient;

class IngredientRepo {
  async createIngredient(data: createIngredient): Promise<Ingredient> {
    const [ingredient, created] = await ingredientModel.findOrCreate({
      where: { name: data.name },
      defaults: { name: data.name, userId: data.userId },
    });
    if (!created)
      throw new Conflict("Você já tem um ingrediente com esse nome");
    return ingredient;
  }

  async update(data: updateIngredient, where: WhereOptions): Promise<number> {
    const [affected] = await ingredientModel.update(data, { where });
    return affected;
  }
}
export default IngredientRepo;
