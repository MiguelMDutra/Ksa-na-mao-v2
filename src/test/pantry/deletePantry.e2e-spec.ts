import request from "supertest";
import test, { before, describe } from "node:test";
import assert from "node:assert";

import app from "@src/app";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import createPantry from "../helper/createPantry";

let token: string;
let secondToken: string;

describe("Delete pantry", () => {
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

  test("Should delete a pantry successfully", async () => {
    const response = await request(app)
      .delete("/pantry/1")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    assert.deepStrictEqual(response.body, {
      message: "Estoque apagado com sucesso!",
    });
  });

  test("Should throw BadRequest when user has only one pantry", async () => {
    const response = await request(app)
      .delete("/pantry/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    assert.deepStrictEqual(response.body, {
      message:
        "Você só pode apagar um estoque se você participa de mais de um.",
    });
  });

  test("Should throw Forbidden when deleting another user's pantry", async () => {
    const response = await request(app)
      .delete("/pantry/3")
      .set("Authorization", `Bearer ${token}`)
      .expect(403);

    assert.deepStrictEqual(response.body, {
      message: "Você só pode apagar os seus estoques.",
    });
  });

  test("Should throw Unauthorized without token", async () => {
    await request(app).delete("/pantry/1").expect(401);
  });
});
