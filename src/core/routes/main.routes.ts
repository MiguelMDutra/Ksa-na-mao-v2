import express, { Express } from "express";
import user from "@modules/users/routes/users.main.routes";
import pantry from "@modules/pantry/routes/pantry.routes";
import ingredient from "@modules/recipes/routes/ingredients.routes";

function Routes(app: Express): void {
  app.use(express.json());
  app.use(user);
  app.use(pantry);
  app.use(ingredient);
}

export default Routes;
