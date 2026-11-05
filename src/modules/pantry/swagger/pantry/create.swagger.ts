export const createPantrySwagger = {
  paths: {
    "/": {
      post: {
        summary: "Creates a new pantry",
        description: "Creates a pantry for the authenticated user.",
        security: [{ bearerAuth: [] }],
        tags: ["pantry"],
        requestBody: {
          description: "Pantry information.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: {
                    type: "string",
                    example: "Minha cozinha",
                    description: "Name of the pantry.",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Pantry created successfully.",
          },
          400: {
            description: "Invalid pantry name.",
          },
          401: {
            description: "Unauthorized.",
          },
          409: {
            description: "A pantry with this name already exists.",
          },
        },
      },
    },
  },
};
