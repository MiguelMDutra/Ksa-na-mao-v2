import BadRequest from "@src/core/errors/BadRequest.error";
import Conflict from "@src/core/errors/Conflict.error";
import { createPantry } from "@src/core/types/Pantry.types";
import { Transaction } from "sequelize";
import PantryRepository from "../repository/Pantry.repository";
import models from "@src/database/models";
const sequelize = models.sequelize;
const pr = new PantryRepository();

class CreatePantry {
  async execute(data: createPantry, t?: Transaction): Promise<boolean> {
    if (!data.name.trim()) {
      throw new BadRequest("O estoque precisa de um nome");
    }

    const createTransaction = async (
      transaction: Transaction,
    ): Promise<boolean> => {
      const created = await pr.createPantry(data, transaction);

      if (!created) {
        throw new Conflict("Já existe um estoque com esse nome.");
      }

      //   Await PantryUsers.create(
      //     {
      //       UserId: data.userId,
      //       PantryId: pantry.id,
      //     },
      //     { transaction },
      //   );

      // _await shoppingListServices.createShoppingList(pantry.id, transaction);

      return created;
    };

    if (t) {
      return await createTransaction(t);
    }

    return sequelize.transaction(createTransaction);
  }
}

export default CreatePantry;
