import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class PreparationRecords extends Model {
  declare userId: number;
  declare recipeId: number;
  declare servings: number;
  declare createdAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    PreparationRecords.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
    PreparationRecords.belongsTo(models.recipe, {
      foreignKey: "recipeId",
      as: "recipe",
    });
  }
}

export default (sequelize: Sequelize) => {
  PreparationRecords.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
      },
      servings: {
        type: DataTypes.DOUBLE,
        allowNull: true,
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
      modelName: "PreparationRequest",
      tableName: "PreparationRequests",
      paranoid: true,
    },
  );
  return PreparationRecords;
};
