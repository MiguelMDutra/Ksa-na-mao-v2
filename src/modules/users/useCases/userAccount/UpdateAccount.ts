import BadRequest from "@src/core/errors/BadRequest.error";
import { updateData } from "@src/core/types/User.types";
import UserHelper from "../../repository/User.HELPER";
const uh = new UserHelper();
import UserRepo from "../../repository/User.repository";
const ur = new UserRepo();

class UpdateAccount {
  static async execute(data: updateData, userId: number): Promise<object> {
    if (
      data === undefined ||
      (!data.bio?.trim() && !data.name?.trim() && !data.username?.trim())
    ) {
      throw new BadRequest("Envie algum dado para editar!");
    }

    const user = (await uh.userAllNoSensitives(userId, [
      "userId",
      "name",
      "bio",
      "username",
    ])) as updateData;

    if (data.username && data.username !== user.username) {
      const usernameExists = await uh.usernameExists(data.username);

      if (usernameExists) {
        throw new BadRequest("Esse username já está sendo usado.");
      }
    }

    const realData = {
      name: data.name ? data.name : user.name,
      bio: data.bio ? data.bio : user.bio,
      username: data.username ? data.username : user.username,
    };

    if (
      user.name === realData.name &&
      user.bio === realData.bio &&
      user.username === realData.username
    ) {
      throw new BadRequest(
        "Você precisa mandar algo diferente para ser atualizado.",
      );
    }

    await ur.updateAccount(userId, data);
    return { message: "Conta alterada com sucesso" };
  }
}

export default UpdateAccount;
