import { signUpData } from "@src/core/types/User.types";
import UserRepo from "@modules/users/repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
import auth from "@src/core/jwt/auth";
import Conflict from "@src/core/errors/Conflict.error";
import BadRequest from "@src/core/errors/BadRequest.error";

const ur = new UserRepo();
const uh = new UserHelper();

class SignUp {
  static async execute(userData: signUpData): Promise<string | undefined> {
    if (!userData.email || !userData.password || !userData.username) {
      throw new BadRequest("Algum dado está faltando.");
    }
    if (await uh.usernameExists(userData.username, "all")) {
      throw new Conflict("Esse username já está sendo usado.");
    }
    if (await uh.emailExists(userData.email, "all")) {
      throw new Conflict("Esse email já está sendo usado.");
    }

    const user = await ur.signUp(userData);

    if (user) {
      const token = auth(user);
      return token;
    }
    throw new Conflict("O seu email já esta sendo usado.");
  }
}

export default SignUp;
