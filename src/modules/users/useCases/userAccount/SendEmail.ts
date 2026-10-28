import BrevoService from "@src/core/Apis/Brevo/brevo.service";
import UserHelper from "../../repository/User.HELPER";
const brevoService = new BrevoService();
const uh = new UserHelper();

class SendEmail {
  static async execute(userId: number, type: string): Promise<object> {
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
