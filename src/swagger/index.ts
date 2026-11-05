import swaggerJsdoc from "swagger-jsdoc";
import { userSwagger } from "@modules/users/swagger/userSwagger";
import { pantrySwagger } from "@modules/pantry/swagger/pantrySwagger";
import { recipeSwagger } from "@modules/recipes/swagger/recipeSwagger";

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
      ...pantrySwagger.paths,
      ...recipeSwagger.paths,
    },
  },
  apis: [],
};

export const allDoc = swaggerJsdoc(options);
