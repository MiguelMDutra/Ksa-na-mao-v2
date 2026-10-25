import express from "express";
import Routes from "./core/routes/main.routes";
import ErrorHandler from "./core/errors/ErrorHandler.HANDLER";
import { Error404 } from "./core/errors/Error404.error";

const app = express();
Routes(app);
app.use(Error404);
app.use(ErrorHandler);

export default app;
