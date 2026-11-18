export const getPantryIngredientsSwagger = {
  paths: {
    "/pantry/{pantryId}/ingredients": {
      get: {
        summary: "Gets pantry ingredients",
        description:
          "Retrieves the ingredients of a pantry belonging to the authenticated user.",
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
            in: "query",
            name: "page",
            required: false,
            schema: { type: "integer", default: 1 },
            example: 1,
            description: "Page number.",
          },
          {
            in: "query",
            name: "limit",
            required: false,
            schema: { type: "integer", default: 5 },
            example: 10,
            description: "Number of ingredients per page.",
          },
          {
            in: "query",
            name: "ingredientId",
            required: false,
            schema: { type: "integer" },
            example: 1,
            description: "Filter by ingredient ID.",
          },
          {
            in: "query",
            name: "currentQuantity",
            required: false,
            schema: { type: "number" },
            example: 30,
            description: "Filter by current quantity.",
          },
          {
            in: "query",
            name: "minimumQuantity",
            required: false,
            schema: { type: "number" },
            example: 10,
            description: "Filter by minimum quantity.",
          },
          {
            in: "query",
            name: "expirationDate",
            required: false,
            schema: { type: "string", format: "date" },
            example: "2026-12-31",
            description: "Filter by expiration date.",
          },
          {
            in: "query",
            name: "createdAt",
            required: false,
            schema: { type: "string", format: "date" },
            example: "2026-11-18",
            description: "Filter by creation date.",
          },
          {
            in: "query",
            name: "updatedAt",
            required: false,
            schema: { type: "string", format: "date" },
            example: "2026-11-18",
            description: "Filter by update date.",
          },
          {
            in: "query",
            name: "deletedAt",
            required: false,
            schema: { type: "string", format: "date" },
            example: "2026-11-18",
            description: "Filter by deletion date.",
          },
        ],
        responses: {
          200: {
            description: "Pantry ingredients retrieved successfully.",
          },
          401: {
            description: "Unauthorized.",
          },
          403: {
            description:
              "The user does not have permission to access this pantry.",
          },
        },
      },
    },
  },
};
