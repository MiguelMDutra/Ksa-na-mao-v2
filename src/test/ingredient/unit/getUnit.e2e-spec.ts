import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import createUnit from "@src/test/helper/createUnit";

let token1: string;
let token2: string;

describe("Get units", () => {
  before(async () => {
    await clearDatabase();

    // Admin responsável por cadastrar as unidades
    token1 = await createUser(app, { role: "admin" });

    // Usuário comum responsável pelas consultas
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

  testHelper("Get all units", () => token2, 200, {});

  testHelper("Get unit by name", () => token2, 200, {
    name: "Quilograma",
  });

  testHelper("Get unit by abbreviation", () => token2, 200, {
    abbreviation: "L",
  });

  testHelper("Get unit by type", () => token2, 200, {
    type: "Liquido",
  });

  testHelper("No units found", () => token2, 200, {
    name: "Unidade inexistente",
  });

  testHelper("User is not authenticated", () => "", 401, {});
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  query: Record<string, string>,
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).get("/units").query(query);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (expectedStatus === 200) {
      if (query.name === "Unidade inexistente") {
        assert.strictEqual(response.body.length, 0);
      } else if (query.name) {
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].name, query.name);
      }

      if (query.abbreviation) {
        assert.strictEqual(response.body.length, 1);
        assert.strictEqual(response.body[0].abbreviation, query.abbreviation);
      }

      if (query.type) {
        assert.ok(
          response.body.every(
            (unit: { type: string }) => unit.type === query.type,
          ),
        );
      }

      if (Object.keys(query).length === 0) {
        assert.strictEqual(response.body.length, 2);
      }
    }
  });
}
