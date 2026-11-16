import express, { Express } from "express";
import user from "@modules/users/routes/users.main.routes";
import pantry from "@modules/pantry/routes/pantry.routes";

function Routes(app: Express): void {
  app.use(express.json());
  app.use(user);
  app.use(pantry);
}

export default Routes;
