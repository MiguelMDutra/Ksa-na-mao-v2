import { changeEmailOrPasswordTokenSwagger } from "./changeThroughToken.swagger";
import { deactivateAccountSwagger } from "./deactivateAccount.swagger";
import { updateEmailSwagger, forgotPasswordSwagger } from "./sendEmail.swagger";
import { updateAccountSwagger } from "./updateAccount.swagger";
import { updatePasswordSwagger } from "./updatePassword.swagger";

export const updateSwagger = {
  paths: {
    ...changeEmailOrPasswordTokenSwagger.paths,
    ...deactivateAccountSwagger.paths,
    ...updateEmailSwagger.paths,
    ...forgotPasswordSwagger.paths,
    ...updateAccountSwagger.paths,
    ...updatePasswordSwagger.paths,
  },
};
