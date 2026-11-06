import Conflict from "@src/core/errors/Conflict.error";
import { offsetLimit } from "@src/core/types/auxiliary-types/pagination.types";
import {
  updateIngredient,
  createIngredient,
  Ingredient,
} from "@src/core/types/Ingredient.types";
import { WhereOptions } from "sequelize";
import models from "@src/database/models";

const ingredientModel = models.ingredient;

class IngredientRepo {
  async getMyIngredients(
    { offset, limit }: offsetLimit,
    userId: number,
  ): Promise<Ingredient[]> {
    return await ingredientModel
      .scope({ method: ["users", userId] })
      .findAll({ offset, limit });
  }

  async getAllIngredients(
    { offset, limit }: offsetLimit,
    userId: number,
  ): Promise<Ingredient[]> {
    const ingredients = await ingredientModel
      .scope({ method: ["available", userId] })
      .findAll({
        offset,
        limit,
      });

    return ingredients;
  }

  async createIngredient(data: createIngredient): Promise<Ingredient> {
    const [ingredient, created] = await ingredientModel.findOrCreate({
      where: { name: data.name },
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

  async update(data: updateIngredient, where: WhereOptions): Promise<number> {
    const [affected] = await ingredientModel.update(data, { where });
    return affected;
  }
}
export default IngredientRepo;
