import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Like extends Model {
  declare id: number;
  declare userId: number;
  declare recipeId: number;
  declare commentId: number;
  declare createdAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Like.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    Like.belongsTo(models.recipe, { foreignKey: "recipeId", as: "recipe" });
    Like.belongsTo(models.comment, { foreignKey: "commentId", as: "comment" });
  }
}

export default (sequelize: Sequelize) => {
  Like.init(
    {
      id: {
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
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
        },
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Recipes",
          key: "recipeId",
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
    { sequelize, modelName: "Like", tableName: "Likes" },
  );
  return Like;
};
