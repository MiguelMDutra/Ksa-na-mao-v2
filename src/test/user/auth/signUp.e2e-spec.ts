import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";
import { clearDatabase } from "../../helper/clearDataBase";

describe("SignUp user", () => {
  before(async () => {
    await clearDatabase();
  });
  testHelper("User signs up", "miguel", "miguel@gmail.com", "senha123@", 201);

  testHelper(
    "Username already taken",
    "miguel",
    "migu@gmail.com",
    "senha123@",
    400,
    "Esse username já está sendo usado.",
  );

  testHelperSequelizeMsg(
    "Username with special char",
    "miguel!",
    "migu@gmail.com",
    "senha123@",
    400,
    "Esse campo não permite caracteres especiais.",
  );

  testHelperSequelizeMsg(
    "Username with spaces",
    "migue l",
    "migu@gmail.com",
    "senha123@",
    400,
    "Esse campo não permite espaços.",
  );

  testHelperSequelizeMsg(
    "Username too short",
    "m",
    "migu@gmail.com",
    "senha123@",
    400,
    "O username precisa ter de 3 a 25 caracteres!",
  );

  testHelperSequelizeMsg(
    "Username too long",
    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
    "migu@gmail.com",
    "senha123@",
    400,
    "O username precisa ter de 3 a 25 caracteres!",
  );

  testHelper(
    "email already taken",
    "miguel123",
    "miguel@gmail.com",
    "senha1234@",
    400,
    "O seu email já esta sendo usado.",
  );

  testHelperSequelizeMsg(
    "email isn't email",
    "miguel123",
    "miguelgmail.com",
    "senha1234@",
    400,
    "O campo de email precisa ser um email, o que acha?",
  );

  testHelperSequelizeMsg(
    "email too small",
    "miguel123",
    "m@com",
    "senha1234@",
    400,
    "O email precisa ter entre 6 a 255 caracteres.",
  );

  testHelperSequelizeMsg(
    "email too big",
    "miguel123",
    "m".repeat(255) + "@gmail.com",
    "senha1234@",
    400,
    "O email precisa ter entre 6 a 255 caracteres.",
  );
  testHelperSequelizeMsg(
    "password with spaces",
    "miguel123",
    "migu@gmail.com",
    "senha 1234@",
    400,
    "Esse campo não permite espaços.",
  );

  testHelperSequelizeMsg(
    "no special char",
    "miguel123",
    "migu@gmail.com",
    "senha1234",
    400,
    "A senha precisa de pelo menos um caracter especial.",
  );
});

function testHelper(
  title: string,
  username: string,
  email: string,
  password: string,
  expect: number,
  assertMessage?: string,
): void {
  test(title, async () => {
    const response = await request(app)
      .post("/signUp")
      .send({ username, email, password })
      .expect(expect);

    if (assertMessage) {
      assert.strictEqual(response.body.message, assertMessage);
    }
  });
}

function testHelperSequelizeMsg(
  title: string,
  username: string,
  email: string,
  password: string,
  expect: number,
  assertMessage: string,
): void {
  test(title, async () => {
    const response = await request(app)
      .post("/signUp")
      .send({ username, email, password })
      .expect(expect);

    assert.strictEqual(response.body.message[0].message, assertMessage);
  });
}
