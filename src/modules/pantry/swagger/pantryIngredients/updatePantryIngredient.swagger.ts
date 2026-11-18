export const updatePantryIngredientSwagger = {
  paths: {
    "/pantry/{pantryId}/ingredient/{ingredientId}": {
      patch: {
        summary: "Updates a pantry ingredient",
        description:
          "Updates an ingredient in a pantry belonging to the authenticated user.",
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
          {
            in: "path",
            name: "ingredientId",
            required: true,
            schema: { type: "integer" },
            example: 1,
            description: "ID of the ingredient.",
          },
        ],
        requestBody: {
          description: "Fields to be updated.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["data"],
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      currentQuantity: {
                        type: "number",
                        example: 300,
                        description: "Updated current quantity.",
                      },
                      minimumQuantity: {
                        type: "number",
                        example: 100,
                        description: "Updated minimum quantity.",
                      },
                      unitId: {
                        type: "integer",
                        example: 1,
                        description: "Updated measurement unit ID.",
                      },
                      expirationDate: {
                        type: "string",
                        format: "date",
                        example: "2026-12-31",
                        description: "Updated expiration date.",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Pantry ingredient updated successfully.",
          },
          400: {
            description: "Invalid pantry ingredient information.",
          },
          401: {
            description: "Unauthorized.",
          },
          403: {
            description:
              "The user does not have permission to modify this pantry.",
          },
          404: {
            description: "Pantry ingredient not found.",
          },
        },
      },
    },
  },
};
