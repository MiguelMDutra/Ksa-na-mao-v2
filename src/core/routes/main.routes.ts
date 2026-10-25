import express, { Express } from "express";

function Routes(app: Express): void {
  app.use(express.json());
}

export default Routes;
