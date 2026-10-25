import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";
import { validateHasNoSpaces } from "@src/core/util/noSpaces";

class UserChangeToken extends Model {
  declare id: number;
  declare userId: number;
  declare token: string;
  declare resetEmail: string;
  declare used: boolean;
  declare createdAt: Date;
  declare expiresAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;

  static associate(models: DatabaseModels) {
    UserChangeToken.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

export default (sequelize: Sequelize) => {
  UserChangeToken.init(
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
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      resetEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "O email é obrigatório.",
          },
          notEmpty: {
            msg: "O email não pode ser vazio.",
          },
          isEmail: {
            msg: "O email precisa ser um email válido.",
          },
          hasNoSpaces: validateHasNoSpaces,
        },
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiresAt: {
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
      modelName: "UserChangeToken",
      tableName: "userChangeTokens",
      paranoid: true,
    },
  );
  return UserChangeToken;
};
