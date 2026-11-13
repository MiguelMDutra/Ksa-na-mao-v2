import {
  userAllNoPassword,
  UserBasics,
  UserBasicsPassword,
} from "@src/core/types/user/User.types";
import NotFound from "@src/core/errors/NotFound.error";
import models from "@models";

const userModel = models.user;

class UserHelper {
  async userAllNoSensitives<K extends keyof userAllNoPassword>(
    id: number,
    attributes: K[],
  ): Promise<Pick<userAllNoPassword, K>> {
    const user = await userModel.findOne({
      where: { userId: id },
      attributes: [...attributes],
    });

    if (user === null) {
      throw new NotFound("Usuario não encontrado.");
    }

    return user.get({ plain: true }) as Pick<userAllNoPassword, K>;
  }

  async findByIdPassword(id: number): Promise<UserBasicsPassword> {
    const user = await userModel.findOne({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFound("Usuario não encontrado.");
    }

    return user.get({ plain: true }) as UserBasicsPassword;
  }

  async usernameExists(username: string, scope?: string): Promise<boolean> {
    const user = await userModel.scope(scope).findOne({
      where: { username: username },
    });
    return user !== null;
  }

  async userIdExists(userId: number): Promise<boolean> {
    const user = await userModel.findOne({ where: { userId: userId } });
    return user !== null;
  }

  async emailExists(email: string, scope?: string): Promise<UserBasics | null> {
    const user = await userModel.scope(scope).findOne({
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
}

export default UserHelper;
