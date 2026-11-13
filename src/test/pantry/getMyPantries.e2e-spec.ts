import request from "supertest";
import test, { before, describe } from "node:test";
import assert from "node:assert";

import app from "@src/app";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import createPantry from "../helper/createPantry";

let token: string;
let secondToken: string;

describe("Get my pantries", () => {
  before(async () => {
    await clearDatabase();

    token = await createUser(app, {});
    secondToken = await createUser(app, {
      username: "newname",
      email: "newEmail@gmail.com",
    });

    await createPantry(app, token, "Estoque principal");
    await createPantry(app, token, "Estoque secundário");
    await createPantry(app, secondToken, "Estoque de outro usuário");
  });

  testeHelper(
    "Should get all user's pantries successfully",
    () => token,
    0,
    200,
    ["Estoque principal", "Estoque secundário"],
  );

  testeHelper(
    "Should return only the authenticated user's pantries",
    () => secondToken,
    0,
    200,
    ["Estoque de outro usuário"],
  );

  testeHelper("Should respect the limit parameter", () => token, 0, 200);

  testeHelper("Should respect the offset parameter", () => token, 1, 200);
});

async function testeHelper(
  title: string,
  token: () => string,
  page: number,
  expected: number,
  strict?: string[],
): Promise<void> {
  await test(title, async () => {
    const response = await request(app)
      .get(`/pantry?page=${page}`)
      .set("Authorization", `Bearer ${token()}`)
      .expect(expected);

    if (strict !== undefined) {
      const pantryNames = response.body.map(
        (pantry: { name: string }) => pantry.name,
      );

      assert.deepStrictEqual(pantryNames.sort(), strict);
    }
  });
}
