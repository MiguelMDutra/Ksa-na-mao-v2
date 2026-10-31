export const deletePantrySwagger = {
  paths: {
    "/{id}": {
      delete: {
        summary: "Deletes a pantry",
        description:
          "Deletes a pantry owned by the authenticated user. The user must own the pantry and have more than one pantry.",
        security: [{ bearerAuth: [] }],
        tags: ["pantry"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the pantry to delete.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Pantry deleted successfully.",
          },
          400: {
            description: "The user cannot delete their last pantry.",
          },
          401: {
            description: "Unauthorized.",
          },
          403: {
            description: "The user does not own this pantry.",
          },
          500: {
            description: "Failed to delete the pantry.",
          },
        },
      },
    },
  },
};
