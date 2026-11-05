export const updateIngredient = {
  paths: {
    "/ingredient/{id}": {
      patch: {
        summary: "Update an ingredient",
        security: [{ bearerAuth: [] }],
        tags: ["ingredients"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            description: "ID of the ingredient to update",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        requestBody: {
          description: "Fields to update an ingredient",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Flour",
                    minLength: 1,
                    maxLength: 100,
                    nullable: false,
                  },
                  type: {
                    type: "string",
                    enum: ["Solido", "Liquido"],
                    example: "Solido",
                    nullable: false,
                  },
                  isPublic: {
                    type: "boolean",
                    example: true,
                    nullable: false,
                  },
                },
                minProperties: 1,
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ingredient updated successfully",
          },
          400: {
            description: "Invalid data or no changes provided",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "You do not have permission to update this ingredient",
          },
          404: {
            description: "Ingredient not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
};
