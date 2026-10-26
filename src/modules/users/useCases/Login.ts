import NotFound from "@src/core/errors/NotFound.error";
import Unauthorized from "@src/core/errors/Unauthorized.error";
import auth from "@src/core/jwt/auth";
import { signUpData } from "@src/core/types/User.types";
import bcrypt from "bcrypt";
import UserRepository from "../repository/User.repository";
const ur = new UserRepository();

class Login {
  static async execute(userData: signUpData): Promise<string> {
    const user = await ur.emailExists(userData.email);
    if (!user) throw new NotFound("Não há nenhuma conta com esse email.");
    const userPassword = await ur.userAll(user.userId);

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
