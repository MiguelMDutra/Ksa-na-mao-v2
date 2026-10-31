export const deactivateAccountSwagger = {
  paths: {
    "/deactivate-account": {
      delete: {
        summary: "Deactivates the user's account",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        requestBody: {
          description:
            "Provide your current email address to confirm account deactivation.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                    description:
                      "The email address currently associated with your account.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Account deactivated successfully",
          },
          401: {
            description: "Unauthorized",
          },
          403: {
            description: "The provided email does not match the user's account",
          },
        },
      },
    },
  },
};
