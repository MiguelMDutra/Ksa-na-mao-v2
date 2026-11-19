import { createIngredient } from "@src/core/types/Ingredient.types";
import type { Express } from "express";
import request from "supertest";

export default async (
  app: Express,
  { name, type, isPublic }: createIngredient,
  token: string,
): Promise<void> => {
  const body = { name, type, isPublic };

  await request(app)
    .post("/ingredient")
    .set("Authorization", `Bearer ${token}`)
    .send(body)
    .expect(201);
};
