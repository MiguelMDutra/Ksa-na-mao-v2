import type { Express } from "express";
import request from "supertest";

export default async (
  app: Express,
  token: string,
  name: string,
): Promise<void> => {
  const body = {
    name: name ?? "Pantry x",
  };

  await request(app)
    .post("/pantry")
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);
};
