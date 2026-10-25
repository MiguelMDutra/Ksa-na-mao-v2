import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class RecipeIngredient extends Model {
  declare recipeIngredientId: number;
  declare ingredientId: number;
  declare unitId: number;
  declare recipeId: number;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: DatabaseModels) {
    RecipeIngredient.belongsTo(models.recipe, {
      foreignKey: "recipeId",
      as: "recipe",
    });
    RecipeIngredient.belongsTo(models.unit, {
      foreignKey: "unit",
      as: "unitDetails",
    });
    RecipeIngredient.belongsTo(models.ingredient, {
      foreignKey: "ingredientId",
      as: "ingredient",
    });
  }
}

export default (sequelize: Sequelize) => {
  RecipeIngredient.init(
    {
      recipeIngredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
      },
      unitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Units",
          key: "id",
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
      quantity: {
        type: DataTypes.DOUBLE,
        allowNull: false,
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
      modelName: "RecipeIngredient",
      tableName: "RecipeIngredients",
    },
  );
  return RecipeIngredient;
};
