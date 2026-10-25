import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("ShoppingListItems", {
      shoppingListItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("ShoppingListItems");
  },
};
