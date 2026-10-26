import models from "@models";
import NotFound from "@src/core/errors/NotFound.error";
import {
  signUpData,
  userBasics,
  userBasicsPassword,
} from "@src/core/types/User.types";

const sequelize = models.sequelize;
const userModel = models.user;

class UserRepo {
  async userAll(id: number): Promise<userBasicsPassword> {
    const user = await userModel.findOne({ where: { userId: id } });

    if (!user) {
      throw new NotFound("Usuario não encontrado.");
    }

    return user;
  }

  async usernameExists(username: string): Promise<boolean> {
    const user = await userModel.findOne({ where: { username: username } });
    return user !== null;
  }

  async emailExists(email: string): Promise<userBasics | null> {
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!user) return null;
    return {
      userId: user.userId,
      email: user.email,
    };
  }

  async signUp(userData: signUpData): Promise<userBasics | null> {
    return await sequelize.transaction(async (t) => {
      const [user, created] = await userModel.findOrCreate({
        where: {
          email: userData.email,
        },
        defaults: {
          email: userData.email,
          password: userData.password,
          username: userData.username,
        },
        transaction: t,
      });

      //Const data = {
      // UserId: user.id,
      //  Name: "Primeiro estoque!",
      //};

      //Await pantryServices.createPantryAndShoppingList(data, t);

      if (created) {
        return {
          userId: user.userId,
          email: user.email,
        };
      } else return null;
    });
  }
}

export default UserRepo;
