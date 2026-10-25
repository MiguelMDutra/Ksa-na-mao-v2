import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class PantryIngredient extends Model {
  declare pantryId: number;
  declare ingredientId: number;
  declare currentQuantity: number;
  declare minimumQuantity: number;
  declare expirationDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    PantryIngredient.belongsTo(models.pantry, {
      foreignKey: "pantryId",
      as: "pantry",
    });
    PantryIngredient.belongsTo(models.ingredient, {
      foreignKey: "ingredientId",
      as: "ingredient",
    });
  }
}

export default (sequelize: Sequelize) => {
  PantryIngredient.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: "PantryIngredient",
      tableName: "PantryIngredients",
      paranoid: true,
    },
  );
  return PantryIngredient;
};
