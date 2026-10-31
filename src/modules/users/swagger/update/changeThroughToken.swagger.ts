export const changeEmailOrPasswordTokenSwagger = {
  paths: {
    "/change-with-token/{token}": {
      patch: {
        summary:
          "Changes the user's email or password using a verification token",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        parameters: [
          {
            name: "token",
            in: "path",
            required: true,
            description: "Verification token sent to the user's email.",
            schema: {
              type: "string",
              example: "a1b2c3...",
            },
          },
        ],
        requestBody: {
          description: "Provide either a new email or a new password.",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "newemail@example.com",
                    description: "New email address.",
                  },
                  password: {
                    type: "string",
                    example: "NewPassword123@",
                    minLength: 8,
                    maxLength: 100,
                    description: "New password. Spaces are not allowed.",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Account information changed successfully",
          },
          400: {
            description:
              "Invalid data or the new password is identical to the current password",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User or verification token not found",
          },
        },
      },
    },
  },
};
