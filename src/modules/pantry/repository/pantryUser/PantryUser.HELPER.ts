import models from "@src/database/models";

const pantryUserModel = models.pantryUser;

class PantryUserHelper {
  async countPantryUser(userId: number): Promise<number> {
    return await pantryUserModel.count({ where: { userId } });
  }
}

export default PantryUserHelper;
