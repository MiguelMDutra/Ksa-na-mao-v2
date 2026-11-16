import Conflict from "@src/core/errors/Conflict.error";
import { OffsetLimit } from "@src/core/types/auxiliary-types/options/pagination.types";
import {
  IngredientUpdate,
  IngredientCreate,
  IngredientModel,
} from "@src/core/types/ingredient/Ingredient.types";
import { WhereOptions } from "sequelize";
import models from "@src/database/models";

const ingredientModel = models.ingredient;

class IngredientRepo {
  async getMyIngredients(
    { offset, limit }: OffsetLimit,
    userId: number,
  ): Promise<IngredientModel[]> {
    return await ingredientModel
      .scope({ method: ["users", userId] })
      .findAll({ offset, limit });
  }

  async getAllIngredients(
    { offset, limit }: OffsetLimit,
    userId: number,
  ): Promise<IngredientModel[]> {
    const ingredients = await ingredientModel
      .scope({ method: ["available", userId] })
      .findAll({
        offset,
        limit,
      });

    return ingredients;
  }

  async createIngredient(data: IngredientCreate): Promise<IngredientModel> {
    const [ingredient, created] = await ingredientModel.findOrCreate({
      where: { name: data.name, userId: data.userId },
      defaults: {
        name: data.name,
        userId: data.userId,
        isPublic: data.isPublic,
        type: data.type,
      },
    });

    if (!created)
      throw new Conflict("Você já tem um ingrediente com esse nome");

    return ingredient;
  }

  async update(data: IngredientUpdate, where: WhereOptions): Promise<number> {
    const [affected] = await ingredientModel.update(data, { where });
    return affected;
  }
}
export default IngredientRepo;
