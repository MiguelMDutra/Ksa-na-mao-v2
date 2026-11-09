import models from "@src/database/models";

const pantryModel = models.pantry;

class PantryHelper {
  async isUserOwner(id: number, userId: number): Promise<boolean> {
    const isOwner = await pantryModel.findOne({
      where: { pantryId: id, ownerId: userId },
    });
    return isOwner !== null;
  }

  async isDuplicated(userId: number, name: string): Promise<boolean> {
    const pantry = await pantryModel.findOne({
      where: {
        ownerId: userId,
        name: name,
      },
    });
    return pantry !== null;
  }

  async howMany(userId: number): Promise<number> {
    const { count } = await pantryModel.findAndCountAll({
      where: { ownerId: userId },
    });

    return count;
  }
}

export default PantryHelper;
