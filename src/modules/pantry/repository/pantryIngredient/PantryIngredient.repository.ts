import BadRequest from "@src/core/errors/BadRequest.error";
import {
  PantryIngredientCreate,
  PantryIngredientModel,
  PantryIngredientUpdate,
} from "@src/core/types/pantry/PantryIngredient.types";
import models from "@src/database/models";
import { Transaction } from "sequelize";
const pantryIngredientModel = models.pantryIngredient;

class PantryIngredientRepository {
  async createPantryIngredient(
    ingredient: PantryIngredientCreate,
    pantryId: number,
    transaction?: Transaction,
  ): Promise<[PantryIngredientModel, boolean]> {
    const [pantryIngredient, created] =
      await pantryIngredientModel.findOrCreate({
        where: {
          ingredientId: ingredient.ingredientId,
          pantryId: pantryId,
        },
        defaults: {
          ingredientId: ingredient.ingredientId,
          pantryId: pantryId,
          currentQuantity: ingredient.currentQuantity,
          minimumQuantity: ingredient.minimumQuantity,
          expirationDate: ingredient.expirationDate
            ? new Date(ingredient.expirationDate)
            : null,
        },
        transaction,
      });

    return [pantryIngredient, created];
  }

  async addQuantity(
    pantryIngredient: PantryIngredientModel,
    quantity: number,
    transaction?: Transaction,
  ): Promise<void> {
    pantryIngredient.currentQuantity += quantity;

    await pantryIngredient.save({ transaction });
  }

  async update(
    update: PantryIngredientModel,
    ingredient: PantryIngredientUpdate,
    t?: Transaction,
  ): Promise<PantryIngredientModel> {
    const currentQuantity = update.currentQuantity;
    const minimumQuantity = update.minimumQuantity;
    const expirationDate = update.expirationDate;

    update.currentQuantity = ingredient.currentQuantity
      ? ingredient.currentQuantity
      : update.currentQuantity;

    update.minimumQuantity = ingredient.minimumQuantity
      ? ingredient.minimumQuantity
      : update.minimumQuantity;

    update.expirationDate = ingredient.expirationDate
      ? ingredient.expirationDate
      : update.expirationDate;

    if (
      update.currentQuantity !== currentQuantity &&
      update.minimumQuantity !== minimumQuantity &&
      update.expirationDate !== expirationDate
    ) {
      throw new BadRequest("Mude algo para atualizar");
    }
    await update.save({
      transaction: t,
    });

    return update;
  }
}

export default PantryIngredientRepository;
