import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class PantryUser extends Model {
  declare pantryUserId: number;
  declare userId: number;
  declare pantryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    PantryUser.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    PantryUser.belongsTo(models.pantry, {
      foreignKey: "pantryId",
      as: "pantry",
    });
  }
}

export default (sequelize: Sequelize) => {
  PantryUser.init(
    {
      pantryUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Users",
        key: "userId",
      },
      pantryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Pantries",
        key: "pantryId",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "PantryUser",
      tableName: "PantryUsers",
      paranoid: true,
    },
  );
  return PantryUser;
};
