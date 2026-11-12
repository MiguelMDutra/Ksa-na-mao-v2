import express, { Express } from "express";
import user from "@modules/users/routes/users.main.routes";
import pantry from "@modules/pantry/routes/pantry.routes";
import ingredient from "@modules/ingredient/routes/ingredients.routes";
import pantryIngredient from "@modules/pantry/routes/pantryIngredient.routes";

function Routes(app: Express): void {
  app.use(express.json());
  app.use(user);
  app.use(pantry);
  app.use(ingredient);
  app.use(pantryIngredient);
}

export default Routes;
