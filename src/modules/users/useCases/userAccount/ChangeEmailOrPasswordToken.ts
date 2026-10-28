import bcrypt from "bcrypt";
import BadRequest from "@src/core/errors/BadRequest.error";
import NotFound from "@src/core/errors/NotFound.error";
import UserRepo from "@modules/users/repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
import UserChangeToken from "@src/modules/userChangeTokens/repository/UserChangeToken.repository";
import { userBasicsPassword } from "@src/core/types/User.types";

const uct = new UserChangeToken();
const ur = new UserRepo();
const uh = new UserHelper();

class ChangeEmailOrPasswordToken {
  static async execute(
    userId: number,
    newData: userBasicsPassword,
    token?: string,
  ): Promise<object> {
    const user = await uh.findByIdPassword(userId);

    if (!user) {
      throw new NotFound("Usuário não encontrado.");
    }
    if (!token) {
      throw new NotFound("Token não enviado");
    }

    const tokenId = await uct.findOne(userId, token);

    let updateData;

    if (newData.email) {
      updateData = {
        email: newData.email,
      };
    } else if (newData.password) {
      const isTheSamePassword = await bcrypt.compare(
        newData.password,
        user.password,
      );

      if (isTheSamePassword) {
        throw new BadRequest("É exatamente a mesma senha...");
      }

      updateData = {
        password: newData.password,
      };
    } else {
      throw new BadRequest("Esse campo não está aberto para mudanças.");
    }

    const result = ur.wasteToken(updateData, userId, tokenId);

    return result;
  }
}

export default ChangeEmailOrPasswordToken;
