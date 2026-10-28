import express, { Express } from "express";
import user from "@modules/users/routes/users.main.routes";

function Routes(app: Express): void {
  app.use(express.json());
  app.use(user);
}

export default Routes;
