import BadRequest from "@src/core/errors/BadRequest.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import {
  PantryIngredientCreate,
  PantryIngredientModel,
} from "@src/core/types/pantry/PantryIngredient.types";
import { Transaction } from "sequelize";
import models from "@src/database/models";
import PantryIngredientRepository from "../../repository/pantryIngredient/PantryIngredient.repository";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";
const ph = new PantryHelper();

const pir = new PantryIngredientRepository();
const sequelize = models.sequelize;

class CreatePantryIngredient {
  async execute(
    pantryId: number,
    ingredients: PantryIngredientCreate[],
    userId: number,
  ): Promise<void> {
    if (ingredients === null) {
      throw new BadRequest("Selecione um ingrediente.");
    }
    if (!(await ph.isUserOwner(pantryId, userId))) {
      throw new Forbidden();
    }
    await sequelize.transaction(async (t: Transaction) => {
      await Promise.all(
        ingredients.map(async (ingredient) => {
          const [pantryIngredient, created]: [PantryIngredientModel, boolean] =
            await pir.createPantryIngredient(ingredient, pantryId, t);
          if (!created) {
            pantryIngredient.currentQuantity += ingredient.currentQuantity;

            await pir.addQuantity(
              pantryIngredient,
              ingredient.currentQuantity,
              t,
            );
          }

          return pantryIngredient;
        }),
      );
    });
  }
}

export default CreatePantryIngredient;
