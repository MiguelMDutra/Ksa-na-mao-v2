import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";
import { clearDatabase } from "../helper/clearDataBase";
import createUser from "../helper/createUser";

describe("Login user", { concurrency: false }, () => {
  before(async () => {
    await clearDatabase();

    await createUser(app, {});
  });

  testHelper("Login successful", "miguelnewemail@gmail.com", "senha123@", 200);

  testHelper(
    "Email does not exist",
    "inexistente@gmail.com",
    "senha123@",
    404,
    "Não há nenhuma conta com esse email.",
  );

  testHelper(
    "Incorrect password",
    "miguelnewemail@gmail.com",
    "senhaerrada@",
    401,
    "Senha incorreta!",
  );

  testHelper("Email is not an email", "miguelgmail.com", "senha123@", 404);

  testHelper("Email is missing", undefined, "senha123@", 400);

  testHelper("Password is missing", "miguelnewemail@gmail.com", undefined, 400);

  testHelper("Empty body", undefined, undefined, 400);
});

function testHelper(
  title: string,
  email: string | undefined,
  password: string | undefined,
  expectedStatus: number,
  expectedMessage?: string,
): void {
  test(title, async () => {
    const body: { email?: string; password?: string } = {};

    if (email !== undefined) body.email = email;
    if (password !== undefined) body.password = password;

    const response = await request(app)
      .post("/login")
      .send(body)
      .expect(expectedStatus);

    if (expectedMessage !== undefined) {
      assert.strictEqual(response.body.message, expectedMessage);
    }
  });
}
