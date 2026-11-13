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
  });

  testeHelper("Should get all info successfully", () => token, 1, 200);

  testeHelper("Should throw forbidden", () => secondToken, 1, 403);

  testeHelper("Should return Not found Pantry", () => token, 999, 404);

  testeHelper("Should respect the limit parameter", () => token, 1, 200);

  testeHelper("Should respect the offset parameter", () => token, 1, 200);
});

async function testeHelper(
  title: string,
  token: () => string,
  pantryId: number,
  expected: number,
  strict?: string[],
): Promise<void> {
  await test(title, async () => {
    const response = await request(app)
      .get(`/pantry/${pantryId}`)
      .set("Authorization", `Bearer ${token()}`)
      .expect(expected);

    if (strict !== undefined) {
      assert.deepStrictEqual(response.body, strict);
    }
  });
}
