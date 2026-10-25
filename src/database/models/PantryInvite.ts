import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class PantryInvite extends Model {
  declare id: number;
  declare inviterId: number;
  declare invitedId: number;
  declare pantryId: number;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    PantryInvite.belongsTo(models.user, {
      foreignKey: "inviterId",
      as: "inviter",
    });
    PantryInvite.belongsTo(models.user, {
      foreignKey: "invitedId",
      as: "invitee",
    });
    PantryInvite.belongsTo(models.pantry, {
      foreignKey: "pantryId",
      as: "pantry",
    });
  }
}

export default (sequelize: Sequelize) => {
  PantryInvite.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      inviterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Users",
        key: "userId",
      },
      invitedId: {
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
      status: {
        type: DataTypes.ENUM("Pendente", "Rejeitado", "Aceito"),
        defaultValue: "Pendente",
        allowNull: true,
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
      modelName: "PantryInvite",
      tableName: "PantryInvites",
      paranoid: true,
    },
  );
  return PantryInvite;
};
