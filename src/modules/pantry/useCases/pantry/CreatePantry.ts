import BadRequest from "@src/core/errors/BadRequest.error";
import Conflict from "@src/core/errors/Conflict.error";
import { PantryCreate } from "@src/core/types/pantry/Pantry.types";
import { Transaction } from "sequelize";
import PantryRepository from "../../repository/pantry/Pantry.repository";
import PantryUsersRepository from "../../repository/pantryUser/PantryUser.repository";
import PantryUserHelper from "../../repository/pantryUser/PantryUser.HELPER";
import models from "@src/database/models";
const sequelize = models.sequelize;
const pr = new PantryRepository();
const pur = new PantryUsersRepository();
const puh = new PantryUserHelper();

class CreatePantryClass {
  async execute(data: PantryCreate, t?: Transaction): Promise<boolean> {
    if (!data.name || !data.name.trim()) {
      throw new BadRequest("O estoque precisa de um nome");
    }

    const howMany = await puh.countPantryUser(data.ownerId);

    if (howMany === 10)
      throw new BadRequest(
        "Você pode estar no máximo em 10 estoques simultâneamente.",
      );

    const createTransaction = async (
      transaction: Transaction,
    ): Promise<boolean> => {
      const { created, pantryId } = await pr.createPantry(data, transaction);

      if (!created) {
        throw new Conflict("Já existe um estoque com esse nome.");
      }

      await pur.createPantryUser(
        { userId: data.ownerId, pantryId: pantryId },
        transaction,
      );

      // _await shoppingListServices.createShoppingList(pantry.id, transaction);

      return created;
    };

    if (t) {
      return await createTransaction(t);
    }

    return sequelize.transaction(createTransaction);
  }
}

export default CreatePantryClass;
