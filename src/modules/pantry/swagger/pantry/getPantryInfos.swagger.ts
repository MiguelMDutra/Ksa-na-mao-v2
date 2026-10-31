export const getPantryInfosSwagger = {
  paths: {
    "/{pantryId}": {
      get: {
        summary: "Gets information about a specific pantry",
        security: [{ bearerAuth: [] }],
        tags: ["pantry"],
        parameters: [
          {
            name: "pantryId",
            in: "path",
            required: true,
            description: "ID of the pantry.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Pantry information retrieved successfully.",
          },
          401: {
            description: "Unauthorized.",
          },
          404: {
            description: "Pantry not found.",
          },
        },
      },
    },
  },
};
