export const updatePantrySwagger = {
  paths: {
    "/{id}": {
      patch: {
        summary: "Updates a pantry",
        description:
          "Updates the name of a pantry owned by the authenticated user.",
        security: [{ bearerAuth: [] }],
        tags: ["pantry"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the pantry to update.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        requestBody: {
          description: "New pantry information.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Minha nova cozinha",
                    description: "New pantry name.",
                  },
                },
                required: ["name"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Pantry updated successfully.",
          },
          400: {
            description: "Invalid data or no changes provided.",
          },
          401: {
            description: "Unauthorized.",
          },
          403: {
            description: "User is not the owner of this pantry.",
          },
          409: {
            description: "A pantry with this name already exists.",
          },
        },
      },
    },
  },
};
