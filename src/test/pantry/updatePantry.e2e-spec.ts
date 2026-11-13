import request from "supertest";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import app from "@src/app";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import createPantry from "../helper/createPantry";

let token: string;
let secondToken: string;

describe("Update pantry", () => {
  before(async () => {
    await clearDatabase();

    token = await createUser(app, {});
    secondToken = await createUser(app, {
      username: "newname",
      email: "newEmail@gmail.com",
    });

    await createPantry(app, token, "Estoque principal");
    await createPantry(app, token, "Estoque secundário");
  });

  testeHelper(
    "Should update pantry successfully",
    () => token,
    1,
    { name: "Novo nome" },
    200,
  );

  testeHelper(
    "Should throw forbidden",
    () => secondToken,
    1,
    { name: "Novo nome" },
    403,
  );

  testeHelper(
    "Should return Not found Pantry",
    () => token,
    999,
    { name: "Novo nome" },
    404,
  );

  testeHelper(
    "Should throw conflict when name already exists",
    () => token,
    1,
    { name: "Estoque secundário" },
    409,
  );

  testeHelper(
    "Should throw BadRequest when name is empty",
    () => token,
    1,
    { name: "" },
    400,
  );

  testeHelper(
    "Should throw BadRequest when name is not a string",
    () => token,
    1,
    { name: 123 },
    400,
  );

  testeHelper(
    "Should throw BadRequest when trying to update ownerId",
    () => token,
    1,
    { ownerId: 2, name: "Novo nome" },
    400,
  );
});

async function testeHelper(
  title: string,
  token: () => string,
  pantryId: number,
  data: object,
  expected: number,
  strict?: string[],
): Promise<void> {
  await test(title, async () => {
    const response = await request(app)
      .patch(`/pantry/${pantryId}`)
      .set("Authorization", `Bearer ${token()}`)
      .send(data)
      .expect(expected);

    if (strict !== undefined) {
      assert.deepStrictEqual(response.body, strict);
    }
  });
}
