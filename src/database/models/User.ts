import { DataTypes, Model, Sequelize } from "sequelize";
import { DatabaseModels } from "./index";
import { validateHasNoSpaces } from "@src/core/util/noSpaces";
import { validateHasSpecialCharacter } from "@src/core/util/specialCharacters";
import { goodPassword } from "@src/core/util/goodPassword";
import bcrypt from "bcrypt";

class User extends Model {
  declare userId: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare pfp: string;
  declare name: string;
  declare bio: string;
  declare role: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
  declare passwordUpdatedAt: Date;
  declare emailUpdatedAt: Date;
  declare usernameUpdatedAt: Date;

  static associate(models: DatabaseModels) {
    // UserChangeToken
    User.hasMany(models.userChangeToken, {
      foreignKey: "userId",
      as: "changeTokens",
    });

    // Follower
    User.hasMany(models.follower, {
      foreignKey: "followerId",
      as: "following",
    });
    User.hasMany(models.follower, {
      foreignKey: "followedId",
      as: "followers",
    });

    //Ingredient
    User.hasMany(models.ingredient, {
      foreignKey: "userId",
      as: "ingredients",
    });

    //PantryInvite
    User.hasMany(models.pantryInvite, {
      foreignKey: "inviterId",
      as: "sentPantryInvites",
    });
    User.hasMany(models.pantryInvite, {
      foreignKey: "invitedId",
      as: "receivedPantryInvites",
    });

    //Pantry
    User.hasMany(models.pantry, { foreignKey: "ownerId", as: "ownedPantries" });

    //PantryUser
    User.hasMany(models.pantryUser, {
      foreignKey: "userId",
      as: "pantryMemberships",
    });

    //ShoppingList
    User.hasMany(models.shoppingList, {
      foreignKey: "userId",
      as: "shoppingLists",
    });

    //Recipe
    User.hasMany(models.recipe, { foreignKey: "userId", as: "recipes" });

    //PreparationRequest
    User.hasMany(models.preparationRequest, {
      foreignKey: "userId",
      as: "preparationRequests",
    });

    //Like
    User.hasMany(models.like, { foreignKey: "userId", as: "likes" });

    //Comment
    User.hasMany(models.comment, {
      foreignKey: "userId",
      as: "comments",
    });

    //Notification
    User.hasMany(models.notification, {
      foreignKey: "receiverId",
      as: "notifications",
    });
    User.hasMany(models.notification, {
      foreignKey: "creatorId",
      as: "createdNotifications",
    });
  }
}
export default (sequelize: Sequelize) => {
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 25],
            msg: "O username precisa ter de 3 a 25 caracteres!",
          },
          notEmpty: true,
          hasNoSpaces: validateHasNoSpaces,
          hasSpecialCharacter: validateHasSpecialCharacter,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [6, 255],
            msg: "O email precisa ter entre 6 a 255 caracteres.",
          },
          isEmail: {
            msg: "O campo de email precisa ser um email, o que acha?",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100],
            msg: "A senha precisa ter entre 8 a 100 caracteres.",
          },
          hasNoSpaces: validateHasNoSpaces,
          goodPassword: goodPassword,
        },
      },
      pfp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 100],
            msg: "O nome pode ter até 100 caracteres!",
          },
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 255],
            msg: "A sua bio pode ter até 250 caracteres!",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      passwordUpdatedAt: {
        type: DataTypes.DATE,
      },
      emailUpdatedAt: {
        type: DataTypes.DATE,
      },
      usernameUpdatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      scopes: {
        all: {
          paranoid: false,
        },
      },
      sequelize,
      modelName: "User",
      paranoid: true,
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 12);
            user.passwordUpdatedAt = new Date();
          }
        },

        beforeUpdate: (user) => {
          if (user.changed("email")) {
            user.emailUpdatedAt = new Date();
          }

          if (user.changed("username")) {
            user.usernameUpdatedAt = new Date();
          }
        },
      },
    },
  );
  return User;
};
