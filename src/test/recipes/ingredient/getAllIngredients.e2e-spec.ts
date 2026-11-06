import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import postIngredient from "@src/test/helper/postIngredient";

let token1: string;
let token2: string;

describe("Get all ingredients", () => {
  before(async () => {
    await clearDatabase();

    token1 = await createUser(app, {});
    token2 = await createUser(app, {
      username: String(Date.now()),
      email: "emailemail@gmail.com",
    });

    await postIngredient(
      app,
      { userId: 1, name: "Arroz", type: "Solido", isPublic: true },
      token1,
    );

    await postIngredient(
      app,
      { userId: 1, name: "Feijão", type: "Solido", isPublic: false },
      token1,
    );

    await postIngredient(
      app,
      { userId: 2, name: "Macarrão", type: "Solido", isPublic: false },
      token2,
    );
  });

  testHelper("Return all own and public ingredients", () => token1, 200, [
    "Arroz",
    "Feijão",
  ]);

  testHelper("Return all own and public ingredients 2", () => token2, 200, [
    "Arroz",
    "Macarrão",
  ]);

  testHelper("Reject request without authentication token", () => "", 401);
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  assertObject?: object,
  query = "",
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).get(`/ingredients${query}`);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (assertObject) {
      assert.deepStrictEqual(
        response.body.map((ingredient: { name: string }) => ingredient.name),
        assertObject,
      );
    }
  });
}
