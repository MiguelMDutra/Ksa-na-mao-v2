import models from "@models";
import NotFound from "@src/core/errors/NotFound.error";
import { signUpData, userBasics, userUpdate } from "@src/core/types/User.types";

const sequelize = models.sequelize;
const userModel = models.user;
const userChangeTokenModel = models.userChangeToken;

class UserRepo {
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

  async updateAccount(userId: number, data: userUpdate): Promise<boolean> {
    const user = await userModel.findOne({ where: { userId } });

    if (!user) {
      throw new NotFound("Usuário não encontrado");
    }

    user.set(data);
    await user.save();

    return true;
  }

  async updatePassword(newPassword: string, userId: number): Promise<void> {
    await userModel.update(
      { password: newPassword },
      {
        where: { userId: userId },
        individualHooks: true,
      },
    );
  }

  async wasteToken(
    updateData: { email?: string; password?: string },
    userId: number,
    tokenId: number,
  ): Promise<object> {
    return await sequelize.transaction(async (t) => {
      await userModel.update(updateData, {
        where: { userId: userId },
        transaction: t,
        individualHooks: true,
      });

      await userChangeTokenModel.update(
        { used: true },
        {
          where: { id: tokenId },
          transaction: t,
        },
      );

      return {
        message: "Conta atualizada com sucesso!",
      };
    });
  }

  async DeactivateAccount(userId: number): Promise<void> {
    await userModel.destroy({
      where: { userId: userId },
    });
  }
}

export default UserRepo;
