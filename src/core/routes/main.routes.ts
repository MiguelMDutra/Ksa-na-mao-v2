import express, { Express } from "express";
import user from "@modules/users/routes/users.main.routes";
import pantry from "@modules/pantry/routes/pantry.routes";
import ingredient from "@modules/ingredient/routes/ingredients.routes";
import units from "@modules/ingredient/routes/unit.routes";

function Routes(app: Express): void {
  app.use(express.json());
  app.use(user);
  app.use(pantry);
  app.use(ingredient);
  app.use(units);
}

export default Routes;
