import dataSource from "@models";
import Forbidden from "@src/core/errors/Forbidden.error";
import { Op } from "sequelize";
const UserChangeTokenModel = dataSource.userChangeToken;

class UserChangeToken {
  async tokenExists(token: string): Promise<boolean> {
    const tokenExists = await UserChangeTokenModel.findOne({
      where: { token },
    });
    if (tokenExists) return true;
    else return false;
  }

  async createToken(
    userId: number,
    token: string,
    resetEmail: string,
  ): Promise<string> {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const wholeToken = await UserChangeTokenModel.create({
      userId,
      token,
      resetEmail,
      expiresAt,
      used: false,
    });
    token = wholeToken.token;

    return token;
  }

  async findOne(userId: number, token: string): Promise<number> {
    const dateNow = new Date();

    const foundToken = await UserChangeTokenModel.findOne({
      where: {
        userId: userId,
        token: token,
        expiresAt: {
          [Op.gt]: dateNow,
        },
        used: false,
      },
      order: [["createdAt", "DESC"]],
    });

    if (!foundToken) {
      throw new Forbidden("Seu token expirou... tente pedir outro email!");
    }
    const tokenId = foundToken.id;

    return tokenId;
  }
}

export default UserChangeToken;
