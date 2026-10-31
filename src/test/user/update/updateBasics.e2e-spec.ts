import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";
import { clearDatabase } from "../../helper/clearDataBase";
import createUser from "../../helper/createUser";

let token: string;

describe("update basic", () => {
  before(async () => {
    await clearDatabase();
    token = await createUser(app, {});
    await createUser(app, {
      username: "usernameexistente",
      email: "email123@gmail.com",
    });
  });

  testHelper(
    "Update name successfully",
    { name: "Novo Nome" },
    200,
    "Conta alterada com sucesso",
  );

  testHelper(
    "Update bio successfully",
    { bio: "Nova bio" },
    200,
    "Conta alterada com sucesso",
  );

  testHelper(
    "Update username successfully",
    { username: "novousername" },
    200,
    "Conta alterada com sucesso",
  );

  testHelper("Empty body", {}, 400, "Envie algum dado para editar!");

  testHelper("Undefined body", undefined, 400, "Envie algum dado para editar!");

  testHelper(
    "All fields empty",
    { name: "", bio: "", username: "" },
    400,
    "Envie algum dado para editar!",
  );

  testHelper(
    "All fields contain whitespace",
    { name: "   ", bio: "   ", username: "   " },
    400,
    "Envie algum dado para editar!",
  );

  testHelper(
    "Username already exists",
    { username: "usernameexistente" },
    409,
    "Esse username já está sendo usado.",
  );

  testHelper(
    "No changes to name",
    { name: "Novo Nome" },
    400,
    "Você precisa mandar algo diferente para ser atualizado.",
  );

  testHelper(
    "No changes to bio",
    { bio: "Nova bio" },
    400,
    "Você precisa mandar algo diferente para ser atualizado.",
  );

  testHelper(
    "No changes to username",
    { username: "novousername" },
    400,
    "Você precisa mandar algo diferente para ser atualizado.",
  );
});

type UpdateData = {
  name?: string;
  bio?: string;
  username?: string;
};

function testHelper(
  title: string,
  data: UpdateData | undefined,
  expectedStatus: number,
  expectedMessage?: string,
): void {
  test(title, async () => {
    const response = await request(app)
      .patch("/patch-basics")
      .send(data)
      .set("Authorization", `Bearer ${token}`)
      .expect(expectedStatus);

    if (expectedMessage !== undefined) {
      assert.strictEqual(response.body.message, expectedMessage);
    }
  });
}
