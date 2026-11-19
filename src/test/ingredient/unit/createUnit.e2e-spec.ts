import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import { UnitCreate } from "@src/core/types/ingredient/Unit.types";

let token1: string;
let token2: string;

describe("Create unit", () => {
  before(async () => {
    await clearDatabase();

    token1 = await createUser(app, { role: "admin" });
    token2 = await createUser(app, {
      username: String(Date.now()),
      email: "emailemail@gmail.com",
    });
  });

  testHelper("Create unit successfully", () => token1, 201, {
    name: "Grama",
    abbreviation: "g",
    type: "Solido",
  });

  testHelper("Missing required data", () => token1, 400, {
    name: "Grama",
    abbreviation: "",
    type: "Solido",
  });

  testHelper("Invalid unit type", () => token1, 400, {
    name: "Grama",
    abbreviation: "g",
    type: "Invalido",
  });

  testHelper("Unit already exists", () => token1, 400, {
    name: "Grama",
    abbreviation: "g",
    type: "Solido",
  });

  testHelper("User is not admin", () => token2, 403, {
    name: "Quilograma",
    abbreviation: "kg",
    type: "Solido",
  });

  testHelper("User is not authenticated", () => "", 401, {
    name: "Litro",
    abbreviation: "L",
    type: "Liquido",
  });
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  body: UnitCreate,
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).post("/units").send(body);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (expectedStatus === 201) {
      assert.strictEqual(response.body[0].name, body.name);
      assert.strictEqual(response.body[0].abbreviation, body.abbreviation);
      assert.strictEqual(response.body[0].type, body.type);
    }
  });
}
