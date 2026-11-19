import Forbidden from "@src/core/errors/Forbidden.error";
import { OffsetLimit } from "@src/core/types/auxiliary-types/options/pagination.types";
import PantryIngredientRepository from "../../repository/pantryIngredient/PantryIngredient.repository";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";
import { PantryIngredientModel } from "@src/core/types/pantry/PantryIngredients/PantryIngredient.types";
import { WhereOptions } from "sequelize";
const ph = new PantryHelper();
const pir = new PantryIngredientRepository();

class GetPantryIngredients {
  async execute(
    pantryId: number,
    userId: number,
    { offset, limit }: OffsetLimit,
    where: WhereOptions,
  ): Promise<PantryIngredientModel[]> {
    if (!(await ph.isUserOwner(pantryId, userId))) {
      throw new Forbidden();
    }
    const response = await pir.getPantryIngredients(
      {
        offset,
        limit,
      },
      where,
    );
    return response;
  }
}

export default GetPantryIngredients;
