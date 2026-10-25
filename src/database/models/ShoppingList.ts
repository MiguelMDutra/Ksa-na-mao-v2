import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class ShoppingList extends Model {
  declare shoppingListId: number;
  declare userId: number;
  declare createdAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    ShoppingList.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    ShoppingList.hasMany(models.shoppingListItem, {
      foreignKey: "shoppingListId",
      as: "items",
    });
    ShoppingList.belongsTo(models.pantry, {
      foreignKey: "pantryId",
      as: "Pantry",
    });
  }
}

export default (sequelize: Sequelize) => {
  ShoppingList.init(
    {
      shoppingListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      pantryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pantries",
          key: "pantryId",
        },
      },
      createdAt: {
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
      modelName: "ShoppingList",
      tableName: "ShoppingLists",
    },
  );
  return ShoppingList;
};
