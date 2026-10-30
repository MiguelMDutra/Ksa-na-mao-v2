import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";

import { clearDatabase } from "../../helper/clearDataBase";
import createUser from "../../helper/createUser";
import createResetToken from "../../helper/createUserToken";

let authToken: string;

describe("change email or password through token", () => {
  before(async () => {
    await clearDatabase();
    authToken = await createUser(app, {});
  });

  testHelper(
    "Change email successfully",
    "token-change-email",
    { email: "novoemail@gmail.com" },
    200,
  );

  testHelper(
    "Change password successfully",
    "token-change-password",
    { password: "NovaSenha@123" },
    200,
  );

  //   TestHelper(
  //     "Token not found",
  //     "token-inexistente",
  //     { email: "outroemail@gmail.com" },
  //     404,
  //     2,
  //   );

  testHelper(
    "Same password",
    "token-same-password",
    { password: "NovaSenha@123" },
    400,
  );

  test("Expired token", async () => {
    const token = "token-expirado";

    await createResetToken(
      1,
      token,
      "miguelnewemail@gmail.com",
      new Date(Date.now() - 1000),
    );

    const response = await request(app)
      .patch(`/change-with-token/${token}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ email: "expirado@gmail.com" });

    assert.notStrictEqual(response.status, 200);
  });
});

type ChangeData = {
  email?: string;
  password?: string;
};

function testHelper(
  title: string,
  token: string,
  data: ChangeData,
  expectedStatus: number,
  userId: number = 1,
): void {
  test(title, async () => {
    await createResetToken(userId, token, "miguelnewemail@gmail.com");

    const response = await request(app)
      .patch(`/change-with-token/${token}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(data)
      .expect(expectedStatus);

    if (expectedStatus === 200) {
      assert.ok(response.body);
    }
  });
}
