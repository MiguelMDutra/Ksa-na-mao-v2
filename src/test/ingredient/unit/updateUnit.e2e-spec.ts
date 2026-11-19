import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import { UnitUpdate } from "@src/core/types/ingredient/Unit.types";
import createUnit from "@src/test/helper/createUnit";

let token1: string;
let token2: string;

describe("Update unit", () => {
  before(async () => {
    await clearDatabase();

    token1 = await createUser(app, { role: "admin" });
    token2 = await createUser(app, {
      username: String(Date.now()),
      email: "emailemail@gmail.com",
    });

    await createUnit(app, token1, {
      name: "Quilograma",
      abbreviation: "kg",
      type: "Solido",
    });

    await createUnit(app, token1, {
      name: "Litro",
      abbreviation: "L",
      type: "Liquido",
    });
  });

  testHelper("Update unit successfully", () => token1, 200, 1, {
    name: "Grama",
    abbreviation: "g",
    type: "Solido",
  });

  testHelper("Unit does not exist", () => token1, 400, 999, {
    name: "Unidade",
    abbreviation: "un",
    type: "Solido",
  });

  testHelper("Invalid unit id", () => token1, 400, 0, {
    name: "Grama",
    abbreviation: "g",
    type: "Solido",
  });

  testHelper("Missing required data", () => token1, 400, 1, {
    name: "Grama",
    abbreviation: "",
    type: "Solido",
  });

  testHelper("Invalid unit type", () => token1, 400, 1, {
    name: "Grama",
    abbreviation: "g",
    type: "Invalido",
  });

  testHelper("Unit information already exists", () => token1, 409, 1, {
    name: "Litro",
    abbreviation: "L",
    type: "Liquido",
  });

  testHelper("User is not admin", () => token2, 403, 1, {
    name: "Quilograma",
    abbreviation: "kg",
    type: "Solido",
  });

  testHelper("User is not authenticated", () => "", 401, 1, {
    name: "Quilograma",
    abbreviation: "kg",
    type: "Solido",
  });
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  unitId: number,
  body: UnitUpdate,
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).put(`/units/${unitId}`).send(body);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (expectedStatus === 200) {
      assert.strictEqual(
        response.body.message,
        "1 informaçäo(öes) alteradas com sucesso!",
      );
    }
  });
}
