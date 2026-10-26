import models from "@models";
import { signUpData, UserFindOne } from "@src/core/types/User.types";

const sequelize = models.sequelize;
const userModel = models.user;

class UserRepo {
  async usernameExists(username: string): Promise<boolean> {
    const user = await userModel.findOne({ where: { username: username } });
    return user !== null;
  }

  async signUp(userData: signUpData): Promise<UserFindOne | null> {
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

      if (created) return user;
      else return null;
    });
  }
}

export default UserRepo;
