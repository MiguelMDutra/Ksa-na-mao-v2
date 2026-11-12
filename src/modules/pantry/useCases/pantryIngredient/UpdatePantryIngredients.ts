import {
  PantryIngredientModel,
  PantryIngredientUpdate,
} from "@src/core/types/pantry/PantryIngredient.types";
import { Transaction } from "sequelize";
import models from "@src/database/models";
import PantryIngredientHelper from "../../repository/pantryIngredient/PantryIngredient.HELPER";
import PantryIngredientRepository from "../../repository/pantryIngredient/PantryIngredient.repository";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";
import AppError from "@src/core/errors/AppError.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import BadRequest from "@src/core/errors/BadRequest.error";

const ph = new PantryHelper();
const pir = new PantryIngredientRepository();
const pih = new PantryIngredientHelper();
const sequelize = models.sequelize;

class UpdatePantryIngredient {
  async execute(
    data: PantryIngredientModel[],
    pantryId: number,
    ingredientId: number,
    userId: number,
  ): Promise<void> {
    if (!(await ph.isUserOwner(pantryId, userId))) {
      throw new Forbidden();
    }
    if (data.length === 0 || isNaN(ingredientId) || isNaN(pantryId)) {
      throw new BadRequest("Envie algo para atualizar!");
    }
    await sequelize.transaction(async (t: Transaction) => {
      await Promise.all(
        data.map(async (ingredient: PantryIngredientUpdate) => {
          const foundIngredient = await pih.findOneIngredient(
            ingredientId,
            pantryId,
            t,
          );

          if (!foundIngredient) {
            const [pantryIngredient, created]: [
              PantryIngredientModel,
              boolean,
            ] = await pir.createPantryIngredient(
              {
                ingredientId: ingredient.ingredientId,
                pantryId: pantryId,
                minimumQuantity: ingredient.minimumQuantity,
                currentQuantity: ingredient.currentQuantity,
                expirationDate: ingredient.expirationDate,
              },
              pantryId,
              t,
            );
            if (!created)
              throw new AppError(
                "Houve um erro no servidor... tente novamente!",
              );
            return pantryIngredient;
          }

          const updatedIngredient = await pir.update(
            foundIngredient,
            ingredient,
            t,
          );

          return updatedIngredient;
        }),
      );
    });
  }
}

export default UpdatePantryIngredient;
