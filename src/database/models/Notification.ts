import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Notification extends Model {
  declare id: number;
  declare receiverId: number;
  declare creatorId: number;
  declare recipeId: number;
  declare commentId: number;
  declare isSeen: boolean;
  declare type: string;
  declare message: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Notification.belongsTo(models.user, {
      foreignKey: "receiverId",
      as: "receiver",
    });
    Notification.belongsTo(models.user, {
      foreignKey: "creatorId",
      as: "creator",
    });
    Notification.belongsTo(models.recipe, {
      foreignKey: "recipeId",
      as: "recipe",
    });
    Notification.belongsTo(models.comment, {
      foreignKey: "commentId",
      as: "comment",
    });
  }
}

export default (sequelize: Sequelize) => {
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userId",
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
      commentId: {
        //CRIADO
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Comments",
          key: "id",
        },
      },
      isSeen: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("Like", "Comentario"),
        defaultValue: "Like",
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(255),
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
      modelName: "Notification",
      tableName: "Notifications",
    },
  );
  return Notification;
};
