export const updatePasswordSwagger = {
  paths: {
    "/patch-password": {
      patch: {
        summary: "Changes the user's password",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        requestBody: {
          description:
            "Provide your current password and the new password. To test this endpoint, authorize your request using a valid Bearer token.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["newPassword", "password"],
                properties: {
                  password: {
                    type: "string",
                    example: "oldPassword123@",
                    minLength: 8,
                    maxLength: 100,
                    nullable: false,
                    pattern: "^\\S+$",
                    description: "Current password. Spaces are not allowed.",
                  },
                  newPassword: {
                    type: "string",
                    example: "newPassword123@",
                    minLength: 8,
                    maxLength: 100,
                    nullable: false,
                    pattern: "^\\S+$",
                    description: "New password. Spaces are not allowed.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password changed successfully",
          },
          400: {
            description: "One or more required properties are missing",
          },
          403: {
            description: "Wrong password",
          },
          409: {
            description:
              "New password and current password are exactly the same",
          },
        },
      },
    },
  },
};
