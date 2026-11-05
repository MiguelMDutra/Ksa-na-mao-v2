export const createIngredient = {
  paths: {
    "/ingredient": {
      post: {
        summary: "Create a new ingredient",
        security: [{ bearerAuth: [] }],
        tags: ["ingredients"],
        requestBody: {
          description: "Data required to create an ingredient",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: {
                    type: "string",
                    example: "Flour",
                    minLength: 1,
                    maxLength: 100,
                    nullable: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Ingredient created successfully",
          },
          400: {
            description: "Ingredient name is required",
          },
          401: {
            description: "Unauthorized",
          },
          409: {
            description: "An ingredient with this name already exists",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
};
