import AppError from "@src/core/errors/AppError.error";
import type { Express } from "express";
import request from "supertest";

export default async (
  app: Express,
  {
    username,
    email,
    password,
  }: {
    username?: string;
    email?: string;
    password?: string;
  },
): Promise<string> => {
  const body = {
    username: username ?? "Migus",
    email: email ?? "miguelnewemail@gmail.com",
    password: password ?? "senha123@",
  };

  const response = await request(app).post("/signUp").send(body).expect(201);

  const token: unknown = response.body.token;

  if (typeof token !== "string") {
    throw new AppError("A resposta do login não contém um token válido.");
  }

  return token;
};
