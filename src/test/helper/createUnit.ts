import type { Express } from "express";
import request from "supertest";

export default async (
  app: Express,
  token: string,
  {
    name,
    abbreviation,
    type,
  }: { name?: string; abbreviation?: string; type?: "Solido" | "Liquido" },
): Promise<void> => {
  const body = {
    name: name ?? "grama",
    abbreviation: abbreviation ?? "g",
    type: type ?? "solido",
  };

  await request(app)
    .post("/units")
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);
};
