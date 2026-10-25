import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Recipe extends Model {
  declare recipeId: number;
  declare userId: number;
  declare originalRecipeId: number;
  declare title: string;
  declare description: string;
  declare isPublic: boolean;
  declare category: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Recipe.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    Recipe.hasMany(models.recipeIngredient, {
      foreignKey: "recipeId",
      as: "ingredients",
    });
    Recipe.hasMany(models.preparationRequest, {
      foreignKey: "recipeId",
      as: "linkedPreparationRequests",
    });
    Recipe.hasMany(models.comment, { foreignKey: "recipeId", as: "comments" });
    Recipe.hasMany(models.like, { foreignKey: "recipeId", as: "likes" });
    Recipe.hasMany(models.notification, {
      foreignKey: "recipeId",
      as: "notifications",
    });
    Recipe.hasMany(models.recipe, {
      foreignKey: "originalRecipeId",
      as: "copiedBy",
    });

    Recipe.belongsTo(models.recipe, {
      foreignKey: "originalRecipeId",
      as: "originalRecipe",
    });
  }
}

export default (sequelize: Sequelize) => {
  Recipe.init(
    {
      recipeId: {
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
      originalRecipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [3, 100],
            msg: "A receita precisa ter um título de 3 a 100 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A categoria não pode ser vazia!",
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
    { sequelize, modelName: "Recipe", tableName: "Recipes", paranoid: true },
  );
  return Recipe;
};
