import BadRequest from "@src/core/errors/BadRequest.error";
import { signUpData } from "@src/core/types/User.types";
import UserRepo from "@modules/users/repository/User.repository";
import auth from "@src/core/jwt/auth";

const ur = new UserRepo();

class SignUp {
  static async execute(userData: signUpData): Promise<string | undefined> {
    try {
      if (await ur.usernameExists(userData.username)) {
        throw new BadRequest("Esse username já está sendo usado.");
      }

      const user = await ur.signUp(userData);

      if (user) {
        const token = auth(user);
        return token;
      }
      throw new BadRequest("O seu email já esta sendo usado.");
    } catch (error) {
      throw error;
    }
  }
}

export default SignUp;
