import request from "supertest";
import test, { before, describe } from "node:test";
import assert from "node:assert";

import app from "@src/app";
import { PantryCreate } from "@src/core/types/pantry/Pantry.types";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";

let token: string;
let secondToken: string;

describe("Create pantry", () => {
  before(async () => {
    await clearDatabase();

    token = await createUser(app, {});
    secondToken = await createUser(app, {
      username: "newname",
      email: "newEmail@gmail.com",
    });
  });

  const validData = {
    name: "Estoque principal",
  } as PantryCreate;

  testeHelper(
    "Should create a pantry successfully",
    validData,
    () => token,
    201,
  );

  testeHelper(
    "Should throw Conflict when pantry already exists",
    validData,
    () => token,
    409,
    {
      message: "Já existe um estoque com esse nome.",
    },
  );

  testeHelper(
    "Should allow different owners to have pantries with the same name",
    validData,
    () => secondToken,
    201,
  );

  testeHelper(
    "Should throw BadRequest when name is empty",
    { name: "" } as PantryCreate,
    () => token,
    400,
    {
      message: "O estoque precisa de um nome",
    },
  );

  testeHelper(
    "Should throw BadRequest when name contains only spaces",
    { name: "     " } as PantryCreate,
    () => token,
    400,
    {
      message: "O estoque precisa de um nome",
    },
  );

  test("Should throw Unauthorized without token", async () => {
    const response = await request(app)
      .post("/pantry")
      .send(validData)
      .expect(401);

    assert.ok(response.body.message);
  });
});

async function testeHelper(
  title: string,
  data: PantryCreate,
  token: () => string,
  expected: number,
  strict?: object,
): Promise<void> {
  await test(title, async () => {
    const response = await request(app)
      .post("/pantry")
      .set("Authorization", `Bearer ${token()}`)
      .send(data)
      .expect(expected);

    if (strict !== undefined) {
      assert.deepStrictEqual(response.body, strict);
    }
  });
}
