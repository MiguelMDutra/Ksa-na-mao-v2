import models from "@models";
const userToken = models.userChangeToken;

export default async function createResetToken(
  userId: number,
  token: string,
  email: string,
  expiresAt: Date = new Date(Date.now() + 10 * 60 * 1000),
): Promise<string> {
  await userToken.create({
    userId,
    token,
    expiresAt,
    resetEmail: email,
    used: false,
  });

  return token;
}
