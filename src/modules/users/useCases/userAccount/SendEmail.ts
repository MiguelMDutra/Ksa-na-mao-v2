import BrevoService from "@src/core/Apis/Brevo/brevo.service";
import UserHelper from "../../repository/User.HELPER";
import { MessageOnly } from "@src/core/types/auxiliary-types/responses/messageOnly";
const brevoService = new BrevoService();
const uh = new UserHelper();

class SendEmail {
  static async execute(userId: number, type: string): Promise<MessageOnly> {
    const user = await uh.userAllNoSensitives(userId, ["email", "username"]);

    if (type === "updateEmail") {
      await brevoService.sendEmail(
        user.email,
        user.username,
        userId,
        "updateEmail",
      );
    } else if (type === "forgotPassword") {
      await brevoService.sendEmail(
        user.email,
        user.username,
        userId,
        "forgotPassword",
      );
    }

    return {
      message:
        "Enviamos um email pra você conseguir fazer a alteração desejada!",
    };
  }
}

export default SendEmail;
