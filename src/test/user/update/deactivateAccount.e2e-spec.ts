import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";

import { clearDatabase } from "../../helper/clearDataBase";
import createUser from "../../helper/createUser";

let token: string;

describe("change email or password through token", () => {
  before(async () => {
    await clearDatabase();
    token = await createUser(app, {
      username: "miguelnewaccount",
      email: "miguelnewemail2@gmail.com",
    });
  });
  testHelper(
    "Reject account deactivation with incorrect email",
    "emailincorreto@email.com",
    "O e-mail informado não corresponde à sua conta.",
    403,
  );

  testHelper(
    "Deactivate account with correct email",
    "miguelnewemail2@gmail.com",
    "Conta desativada com sucesso!",
    200,
  );
});

function testHelper(
  title: string,
  email: string,
  assertMessage: string,
  expect: number,
): void {
  test(title, async () => {
    const response = await request(app)
      .delete("/deactivate-account")
      .set("Authorization", `Bearer ${token}`)
      .send({ email })
      .expect(expect);

    if (assertMessage) {
      assert.strictEqual(response.body.message, assertMessage);
    }
  });
}
