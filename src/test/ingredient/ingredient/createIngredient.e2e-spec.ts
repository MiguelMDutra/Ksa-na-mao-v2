import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import { createIngredient } from "@src/core/types/Ingredient.types";

let token1: string;
let token2: string;

describe("Create ingredient", () => {
  before(async () => {
    await clearDatabase();

    token1 = await createUser(app, {});
    token2 = await createUser(app, {
      username: String(Date.now()),
      email: "emailemail@gmail.com",
    });
  });

  testHelper("Create ingredient successfully", () => token1, 201, {
    userId: 1,
    name: "Arroz",
    type: "Solido",
    isPublic: true,
  });

  testHelper("Reject ingredient without a name", () => token1, 400, {
    userId: 1,
    type: "Solido",
    isPublic: true,
  });

  testHelper("Reject ingredient with an existing name", () => token1, 409, {
    userId: 1,
    name: "Arroz",
    type: "Solido",
    isPublic: true,
  });

  testHelper(
    "Allow different users to create ingredients with the same name",
    () => token2,
    201,
    {
      userId: 2,
      name: "Arroz",
      type: "Solido",
      isPublic: true,
    },
  );

  testHelper("Reject request without authentication token", () => "", 401, {
    userId: 1,
    name: "Feijão",
    type: "Solido",
    isPublic: true,
  });
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  body: createIngredient,
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).post("/ingredient").send(body);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (expectedStatus === 201) {
      assert.strictEqual(response.body.name, body.name);
      assert.strictEqual(response.body.type, body.type);
      assert.strictEqual(response.body.isPublic, body.isPublic);
    }
  });
}
