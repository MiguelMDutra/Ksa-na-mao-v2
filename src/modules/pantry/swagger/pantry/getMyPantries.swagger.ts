export const getMyPantriesSwagger = {
  paths: {
    "/": {
      get: {
        summary: "Gets all pantries belonging to the authenticated user",
        security: [{ bearerAuth: [] }],
        tags: ["pantry"],
        parameters: [
          {
            name: "offset",
            in: "query",
            required: false,
            description: "Number of records to skip.",
            schema: {
              type: "integer",
              example: 0,
              default: 0,
              minimum: 0,
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum number of records to return.",
            schema: {
              type: "integer",
              example: 10,
              default: 10,
              minimum: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Pantries retrieved successfully.",
          },
          401: {
            description: "Unauthorized.",
          },
        },
      },
    },
  },
};
