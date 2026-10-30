import request from "supertest";
import test, { before, describe } from "node:test";
import app from "@src/app";
import assert from "node:assert";

import { clearDatabase } from "../../helper/clearDataBase";
import createUser from "../../helper/createUser";

let token: string;

describe("change email or password through token", () => {
  before(async () => {
    await clearDatabase();
    token = await createUser(app, {});
  });

  testHelper("Send email for email update", "/update-email", 201);

  testHelper("Send email for forgot password", "/forgot-password", 201);
});

function testHelper(title: string, route: string, expect: number): void {
  test(title, async () => {
    const response = await request(app)
      .post(route)
      .set("Authorization", `Bearer ${token}`)
      .expect(expect);

    assert.strictEqual(
      response.body.message,
      "Enviamos um email pra você conseguir fazer a alteração desejada!",
    );
  });
}
