import { generateToken } from "../helper/generateToken";
import UserChangeTokenRepository from "../repository/UserChangeToken.repository";
const uct = new UserChangeTokenRepository();

class UserChangeToken {
  async execute(userId: number, resetEmail: string): Promise<string> {
    let token;
    do {
      token = generateToken();
    } while (await uct.tokenExists(token));

    const generetedToken = await uct.createToken(userId, token, resetEmail);

    return generetedToken;
  }
}

export default UserChangeToken;
