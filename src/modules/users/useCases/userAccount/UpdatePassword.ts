import BadRequest from "@src/core/errors/BadRequest.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import bcrypt from "bcrypt";
import UserRepo from "../../repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
const ur = new UserRepo();
const uh = new UserHelper();

class UpdatePassword {
  static async execute(
    data: {
      password: string;
      newPassword: string;
    },
    userId: number,
  ): Promise<object> {
    if (
      !data ||
      typeof data.password !== "string" ||
      !data.password ||
      typeof data.newPassword !== "string" ||
      !data.newPassword
    ) {
      throw new BadRequest("Informe a senha atual e a nova senha.");
    }
    const user = await uh.findByIdPassword(userId);

    const isTheSamePassword = await bcrypt.compare(
      data.newPassword,
      user.password,
    );

    if (!isTheSamePassword) {
      const isApproved = await bcrypt.compare(data.password, user.password);

      if (!isApproved) {
        throw new Forbidden("Senha incorreta!");
      }

      await ur.updatePassword(data.newPassword, userId);

      return { message: "Conta atualizada com sucesso!" };
    }
    throw new BadRequest("A senha é exatamente igual a sua original.");
  }
}

export default UpdatePassword;
