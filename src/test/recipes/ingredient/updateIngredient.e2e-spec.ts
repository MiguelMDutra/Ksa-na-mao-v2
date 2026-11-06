import request from "supertest";
import app from "@src/app";
import test, { before, describe } from "node:test";
import assert from "node:assert";
import { clearDatabase } from "@src/test/helper/clearDataBase";
import createUser from "@src/test/helper/createUser";
import postIngredient from "@src/test/helper/postIngredient";
import { updateIngredient } from "@src/core/types/Ingredient.types";

let token1: string;
let token2: string;

describe("Update ingredient", () => {
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
      { userId: 2, name: "Macarrão", type: "Solido", isPublic: true },
      token2,
    );
  });

  testHelper(
    "Update ingredient successfully",
    () => token1,
    200,
    {
      name: "Arroz integral",
      type: "Solido",
      isPublic: false,
    },
    1,
  );

  testHelper(
    "Reject update without changing anything",
    () => token1,
    400,
    {
      name: "Arroz integral",
      type: "Solido",
      isPublic: false,
    },
    1,
  );

  testHelper("Reject update with empty data", () => token1, 400, {}, 1);

  testHelper(
    "Reject update of another user's ingredient",
    () => token2,
    403,
    {
      name: "Arroz modificado",
      type: "Solido",
      isPublic: true,
    },
    1,
  );

  testHelper(
    "Reject update of nonexistent ingredient",
    () => token1,
    403,
    {
      name: "Farinha",
      type: "Solido",
      isPublic: true,
    },
    999,
  );

  testHelper(
    "Reject request without authentication token",
    () => "",
    401,
    {
      name: "Arroz modificado",
      type: "Solido",
      isPublic: true,
    },
    1,
  );
});

function testHelper(
  title: string,
  getToken: () => string,
  expectedStatus: number,
  body: updateIngredient,
  id: number,
): void {
  test(title, async () => {
    const token = getToken();

    const req = request(app).patch(`/ingredient/${id}`).send(body);

    if (token) {
      req.set("Authorization", `Bearer ${token}`);
    }

    const response = await req.expect(expectedStatus);

    if (expectedStatus === 200) {
      assert.strictEqual(
        response.body.message,
        "Ingrediente atualizado com sucesso!",
      );
    }
  });
}
