import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Follower extends Model {
  declare followerId: number;
  declare followedId: number;
  declare createdAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    Follower.belongsTo(models.user, {
      foreignKey: "followerId",
      as: "follower",
    });
    Follower.belongsTo(models.user, {
      foreignKey: "followedId",
      as: "followed",
    });
  }
}

export default (sequelize: Sequelize) => {
  Follower.init(
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      followedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
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
      modelName: "Follower",
      tableName: "Followers",
      paranoid: true,
    },
  );
  return Follower;
};
