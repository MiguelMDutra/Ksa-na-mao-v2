import swaggerJsdoc from "swagger-jsdoc";
import { userSwagger } from "@src/modules/users/swagger/userSwagger";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ksa-na-mao API",
      version: "0.1.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...userSwagger.paths,
    },
  },
  apis: [],
};

export const allDoc = swaggerJsdoc(options);
