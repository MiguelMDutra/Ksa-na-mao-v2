import NotFound from "@src/core/errors/NotFound.error";
import Unauthorized from "@src/core/errors/Unauthorized.error";
import auth from "@src/core/jwt/auth";
import { signUpData } from "@src/core/types/User.types";
import bcrypt from "bcrypt";
import BadRequest from "@src/core/errors/BadRequest.error";
import UserHelper from "../../repository/User.HELPER";
const uh = new UserHelper();

class Login {
  static async execute(userData: signUpData): Promise<string> {
    if (!userData.email || !userData.password) {
      throw new BadRequest("Voce precisa do email e senha para fazer login");
    }
    const user = await uh.emailExists(userData.email);
    if (!user) throw new NotFound("Não há nenhuma conta com esse email.");
    const userPassword = await uh.findByIdPassword(user.userId);

    const match = await bcrypt.compare(
      userData.password,
      userPassword.password,
    );
    if (!match) throw new Unauthorized("Senha incorreta!");

    const token = auth(user);

    return token;
  }
}

export default Login;
