import UserRepo from "../../repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
import Forbidden from "@src/core/errors/Forbidden.error";
const ur = new UserRepo();
const uh = new UserHelper();

class DeactivateAccount {
  static async execute(email: string, userId: number): Promise<object> {
    const user = await uh.findByIdPassword(userId);

    if (user.email === email) {
      await ur.DeactivateAccount(userId);
      return { message: "Conta desativada com sucesso!" };
    }

    throw new Forbidden("Você só pode desativar a sua conta!");
  }
}

export default DeactivateAccount;
