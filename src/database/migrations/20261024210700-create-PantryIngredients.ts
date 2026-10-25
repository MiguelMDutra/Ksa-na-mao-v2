import { DataTypes, QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("PantryIngredients", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pantryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pantries",
          key: "pantryId",
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
      currentQuantity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      minimumQuantity: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      expirationDate: {
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("PantryIngredients");
  },
};
