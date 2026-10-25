import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Ingredient extends Model {
  declare ingredientId: number;
  declare userId: number;
  declare name: string;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Ingredient.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    Ingredient.hasMany(models.pantryIngredient, {
      foreignKey: "ingredientId",
      as: "pantryEntries",
    });
    Ingredient.hasMany(models.shoppingListItem, {
      foreignKey: "ingredientId",
      as: "shoppingListItems",
    });
    Ingredient.hasMany(models.recipeIngredient, {
      foreignKey: "ingredientId",
      as: "recipeEntries",
    });
  }
}

export default (sequelize: Sequelize) => {
  Ingredient.init(
    {
      ingredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "O nome não pode estar vazio",
          },
        },
      },
      type: {
        type: DataTypes.ENUM("Solido", "Liquido"),
        defaultValue: "Solido",
        allowNull: false,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Ingredient",
      tableName: "Ingredients",
    },
  );
  return Ingredient;
};
