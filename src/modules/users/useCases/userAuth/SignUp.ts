import BadRequest from "@src/core/errors/BadRequest.error";
import { signUpData } from "@src/core/types/User.types";
import UserRepo from "@modules/users/repository/User.repository";
import UserHelper from "../../repository/User.HELPER";
import auth from "@src/core/jwt/auth";

const ur = new UserRepo();
const uh = new UserHelper();

class SignUp {
  static async execute(userData: signUpData): Promise<string | undefined> {
    if (await uh.usernameExists(userData.username)) {
      throw new BadRequest("Esse username já está sendo usado.");
    }

    const user = await ur.signUp(userData);

    if (user) {
      const token = auth(user);
      return token;
    }
    throw new BadRequest("O seu email já esta sendo usado.");
  }
}

export default SignUp;
