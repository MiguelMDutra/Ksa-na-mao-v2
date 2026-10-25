import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class ShoppingListItem extends Model {
  declare shoppingListItemId: number;
  declare shoppingListId: number;
  declare ingredientId: number;
  declare amount: number;
  declare purchasedAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: DatabaseModels) {
    ShoppingListItem.belongsTo(models.shoppingList, {
      foreignKey: "shoppingListId",
      as: "shoppingList",
    });
    ShoppingListItem.belongsTo(models.ingredient, {
      foreignKey: "ingredientId",
      as: "ingredient",
    });
  }
}

export default (sequelize: Sequelize) => {
  ShoppingListItem.init(
    {
      shoppingListItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shoppingListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ShoppingLists",
          key: "shoppingListId",
        },
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ingredients",
          key: "ingredientId",
        },
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      purchasedAt: {
        type: DataTypes.DATE,
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
    },
    {
      sequelize,
      modelName: "ShoppingListItem",
      tableName: "ShoppingListItems",
    },
  );
  return ShoppingListItem;
};
