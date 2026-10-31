import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";
import { clearDatabase } from "../../helper/clearDataBase";
import createUser from "../../helper/createUser";

let token: string;

describe("update password", { concurrency: false }, () => {
  before(async () => {
    await clearDatabase();
    token = await createUser(app, {});
  });

  testHelper(
    "Update password successfully",
    { password: "senha123@", newPassword: "novaSenha123@" },
    200,
    "Conta atualizada com sucesso!",
  );

  testHelper(
    "Incorrect current password",
    { password: "senhaerrada@", newPassword: "outraSenha123@" },
    403,
    "Senha incorreta!",
  );

  testHelper(
    "New password is the same as current password",
    { password: "senha123@", newPassword: "novaSenha123@" },
    409,
    "A senha é exatamente igual a sua original.",
  );

  testHelper(
    "Empty body",
    {} as { password: string; newPassword: string },
    400,
  );

  testHelper(
    "Current password missing",
    { newPassword: "novaSenha123@" } as {
      password: string;
      newPassword: string;
    },
    400,
  );

  testHelper(
    "New password missing",
    { password: "senha123@" } as { password: string; newPassword: string },
    400,
  );
});

function testHelper(
  title: string,
  data: { password: string; newPassword: string },
  expectedStatus: number,
  expectedMessage?: string,
): void {
  test(title, async () => {
    const response = await request(app)
      .patch("/patch-password")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect(expectedStatus);

    if (expectedMessage !== undefined) {
      assert.strictEqual(response.body.message, expectedMessage);
    }
  });
}
