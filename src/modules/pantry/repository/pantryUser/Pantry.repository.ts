import { createPantryUser } from "@src/core/types/pantry/pantryUser.types";
import models from "@src/database/models";
import { Transaction } from "sequelize";
const pantryUserModel = models.pantryUser;

class PantryUsersRepository {
  async isUserInPantry(userId: number, pantryId: number): Promise<boolean> {
    const response = await pantryUserModel.findOne({
      where: { userId: userId, pantryId: pantryId },
    });

    if (response) return true;
    return false;
  }

  async createPantry(
    data: createPantryUser,
    transaction?: Transaction,
  ): Promise<boolean> {
    // eslint-disable-next-line
    const [pantryUser, created] = await pantryUserModel.findOrCreate({
      where: {
        pantryId: data.pantryId,
        userId: data.userId,
      },
      defaults: {
        pantryId: data.pantryId,
        userId: data.userId,
      },
      transaction,
    });

    return created;
  }
}

export default PantryUsersRepository;
