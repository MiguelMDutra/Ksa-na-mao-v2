export const createPantryIngredientSwagger = {
  paths: {
    "/pantry/{pantryId}/ingredients": {
      post: {
        summary: "Adds ingredients to a pantry",
        description:
          "Adds one or more ingredients to a pantry belonging to the authenticated user.",
        security: [{ bearerAuth: [] }],
        tags: ["pantry ingredients"],
        parameters: [
          {
            in: "path",
            name: "pantryId",
            required: true,
            schema: { type: "integer" },
            example: 4,
            description: "ID of the pantry.",
          },
        ],
        requestBody: {
          description: "Ingredients to be added to the pantry.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["ingredients"],
                properties: {
                  ingredients: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["ingredientId", "currentQuantity", "unitId"],
                      properties: {
                        ingredientId: {
                          type: "integer",
                          example: 1,
                          description: "ID of the ingredient.",
                        },
                        currentQuantity: {
                          type: "number",
                          example: 500,
                          description: "Current quantity of the ingredient.",
                        },
                        unitId: {
                          type: "integer",
                          example: 1,
                          description: "ID of the measurement unit.",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Ingredients added to the pantry successfully.",
          },
          400: {
            description: "Invalid ingredient information.",
          },
          401: {
            description: "Unauthorized.",
          },
          403: {
            description:
              "The user does not have permission to modify this pantry.",
          },
        },
      },
    },
  },
};
