import UserRepo from "../../repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
import Forbidden from "@src/core/errors/Forbidden.error";
import { MessageOnly } from "@src/core/types/auxiliary-types/responses/messageOnly";
const ur = new UserRepo();
const uh = new UserHelper();

class DeactivateAccount {
  static async execute(email: string, userId: number): Promise<MessageOnly> {
    const user = await uh.findByIdPassword(userId);

    if (user.email === email) {
      const isDeleted = await ur.DeactivateAccount(userId);
      if (isDeleted) return { message: "Conta desativada com sucesso!" };
      return { message: "Algum erro aconteceu na criação da conta." };
    }

    throw new Forbidden("O e-mail informado não corresponde à sua conta.");
  }
}

export default DeactivateAccount;
