import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Comment extends Model {
  declare id: number;
  declare userId: number;
  declare recipeId: number;
  declare text: string;
  declare createdAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Comment.belongsTo(models.user, { foreignKey: "userId", as: "user" });
    Comment.belongsTo(models.recipe, { foreignKey: "recipeId", as: "recipe" });
    Comment.hasMany(models.like, { foreignKey: "commentId", as: "likes" });
    Comment.hasMany(models.notification, {
      foreignKey: "commentId",
      as: "notifications",
    });
  }
}

export default (sequelize: Sequelize) => {
  Comment.init(
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
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "O comentário deve ter entre 1 e 255 caracteres!",
          },
          notEmpty: {
            msg: "O comentário não pode ser vazio!",
          },
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
      modelName: "Comment",
      tableName: "Comments",
    },
  );
  return Comment;
};
