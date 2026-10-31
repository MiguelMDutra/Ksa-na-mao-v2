export const updateAccountSwagger = {
  paths: {
    "/patch-basics": {
      patch: {
        summary: "Updates the user's account information",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        requestBody: {
          description:
            "Provide at least one field to update your account. You can update your name, bio or username. To test this endpoint, authorize your request using a valid Bearer token.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Miguel",
                    maxLength: 100,
                    nullable: false,
                  },
                  bio: {
                    type: "string",
                    example: "Dinosaur enthusiast and developer.",
                    maxLength: 255,
                    nullable: false,
                  },
                  username: {
                    type: "string",
                    example: "miguelDev",
                    minLength: 3,
                    maxLength: 25,
                    nullable: false,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Account updated successfully",
          },
          400: {
            description:
              "No data provided or all submitted values are identical to the current account information",
          },
          401: {
            description: "Unauthorized",
          },
          409: {
            description: "The username is already being used",
          },
        },
      },
    },
  },
};
