import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Pantry extends Model {
  declare pantryId: number;
  declare ownerId: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Pantry.belongsTo(models.user, { foreignKey: "ownerId", as: "owner" });
    Pantry.hasMany(models.pantryUser, {
      foreignKey: "pantryId",
      as: "memberships",
    });
    Pantry.hasMany(models.pantryIngredient, {
      foreignKey: "pantryId",
      as: "ingredients",
    });
    Pantry.hasMany(models.pantryInvite, {
      foreignKey: "pantryId",
      as: "invites",
    });
    Pantry.hasOne(models.shoppingList, {
      foreignKey: "pantryId",
      as: "ShoppingList",
    });
  }
}

export default (sequelize: Sequelize) => {
  Pantry.init(
    {
      pantryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: "Users",
        key: "userId",
      },
      name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [2, 100],
            msg: "O nome da despensa precisa ter de 2 a 100 caracteres!",
          },
          notNull: {
            msg: "O nome da despensa não pode ser nulo!",
          },
          notEmpty: {
            msg: "O nome da despensa não pode ser vazio!",
          },
        },
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
      modelName: "Pantry",
      tableName: "Pantries",
      paranoid: true,
    },
  );
  return Pantry;
};
