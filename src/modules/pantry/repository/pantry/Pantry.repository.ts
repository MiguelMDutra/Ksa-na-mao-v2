import { CreatePantryResponse } from "@src/core/types/pantry/aux-types/createPantryResponse";
import {
  PantryCreate,
  PantryUpdate,
  PantryModel,
} from "@src/core/types/pantry/Pantry.types";
import models from "@src/database/models";
import { Transaction } from "sequelize";
const pantryModel = models.pantry;
const userModel = models.user;
const pantryUserModel = models.pantryUser;

class PantryRepository {
  async getMyPantries(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<PantryModel[]> {
    const response = await pantryModel.findAll({
      where: { ownerId: userId },
      limit,
      offset,
    });

    return response;
  }

  getPantryInfos(id: number): Promise<PantryModel | null> {
    return pantryModel.findOne({
      where: { pantryId: id },
      include: [
        // {
        //   Model: PantryIngredient,
        //   As: "allPantryIngredients",
        // },

        {
          model: userModel,
          as: "owner",
          attributes: {
            exclude: [
              "password",
              "updatedAt",
              "bio",
              "pfp",
              "role",
              "createdAt",
              "deletedAt",
              "email",
            ],
          },
        },

        // {
        //   Model: ShoppingList,
        //   As: "PantrysShopping",
        // },
      ],
    });
  }

  async createPantry(
    data: PantryCreate,
    transaction: Transaction,
  ): Promise<CreatePantryResponse> {
    const [pantry, created] = await pantryModel.findOrCreate({
      where: {
        name: data.name,
        ownerId: data.ownerId,
      },
      defaults: {
        ownerId: data.ownerId,
        name: data.name,
      },
      transaction,
    });

    await pantryUserModel.create(
      {
        pantryId: pantry.dataValues.pantryId,
        userId: pantry.dataValues.ownerId,
      },
      { transaction },
    );

    return { created: created, pantryId: pantry.pantryId };
  }

  async updatePantry(
    data: PantryUpdate,
    pantryId: number,
  ): Promise<number | null> {
    const [updated] = await pantryModel.update(data, {
      where: { pantryId: pantryId },
    });

    if (updated > 0) return updated;
    return null;
  }

  async deletePantry(id: number): Promise<number | null> {
    const deleted = await pantryModel.destroy({
      where: { pantryId: id },
    });
    return deleted;
  }
}

export default PantryRepository;
