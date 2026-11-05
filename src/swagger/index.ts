import swaggerJsdoc from "swagger-jsdoc";
<<<<<<< Updated upstream
import { userSwagger } from "@src/modules/users/swagger/userSwagger";
=======
import { userSwagger } from "@modules/users/swagger/userSwagger";
import { pantrySwagger } from "@modules/pantry/swagger/pantrySwagger";
import { recipeSwagger } from "@modules/recipes/swagger/recipeSwagger";
>>>>>>> Stashed changes
import { pantrySwagger } from "@src/modules/pantry/swagger/pantrySwagger";

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
<<<<<<< Updated upstream
=======
      ...pantrySwagger.paths,
      ...recipeSwagger.paths,
>>>>>>> Stashed changes
      ...pantrySwagger.paths,
    },
  },
  apis: [],
};

export const allDoc = swaggerJsdoc(options);
