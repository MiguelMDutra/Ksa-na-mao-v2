/* eslint-disable indent */
import UCT from "@src/modules/userChangeTokens/useCases/createToken";
const uct = new UCT();
import { updateEmail, forgotPassword, inviteForPantry } from "./brevo.config";

class BrevoService {
  async sendEmail(
    userEmail: string,
    userName: string,
    userId: number,
    type: string,
    inviterName?: string,
  ): Promise<void> {
    switch (type) {
      case "updateEmail": {
        const token = await uct.execute(userId, userEmail);

        await updateEmail(userEmail, userName, token);
        break;
      }

      case "forgotPassword": {
        const token = await uct.execute(userId, userEmail);

        await forgotPassword(userEmail, userName, token);
        break;
      }

      case "pantryInvite":
        await inviteForPantry(userEmail, userName, inviterName!);
        break;
    }
  }
}

export default BrevoService;
