import express from "express";
import Routes from "./core/routes/main.routes";
import ErrorHandler from "./core/errors/ErrorHandler.HANDLER";
import { Error404 } from "./core/errors/Error404.error";

import swaggerUi from "swagger-ui-express";
import { allDoc } from "./swagger";

const app = express();
Routes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(allDoc));
app.use(Error404);
app.use(ErrorHandler);

export default app;
