export const loginSwagger = {
  paths: {
    "/login": {
      post: {
        summary: "User logs at his account",
        tags: ["users"],
        requestBody: {
          description: "All essencial user data to log at his account",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "miguelemail@gmail.com",
                    minLength: 6,
                    maxLength: 255,
                    nullable: false,
                  },
                  password: {
                    type: "string",
                    example: "password123@",
                    minLength: 8,
                    maxLength: 100,
                    nullable: false,
                    pattern: "^\\S+$",
                    description: "Spaces are not allowed.",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Logged in successfully",
        },
        400: {
          description: "One or more required properties are missing",
        },
        403: {
          description: "wrong password",
        },
        404: {
          description: "Email does not correspond to any user",
        },
        500: {
          description: "Server couldn't end the process",
        },
      },
    },
  },
};
