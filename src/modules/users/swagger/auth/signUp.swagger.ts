export const signUpSwagger = {
  paths: {
    "/signUp": {
      post: {
        summary: "User creates an account",
        tags: ["users"],
        requestBody: {
          description: "All essential user data to create an account",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["username", "email", "password"],
                properties: {
                  username: {
                    type: "string",
                    example: "miguelUsername123",
                    minLength: 3,
                    maxLength: 25,
                    nullable: false,
                    pattern: "^[a-zA-Z0-9]+$",
                    description:
                      "Only letters and numbers are allowed. No special characters or spaces.",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "miguelemailemailemail@gmail.com",
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
        responses: {
          201: {
            description: "Account created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "JWT authentication token",
                      example: "eyJhbGciOiJIUzI1NiJ9...",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "One or more required properties are missing",
          },
          409: {
            description: "Username or email already taken",
          },
          500: {
            description: "Server couldn't complete the process",
          },
        },
      },
    },
  },
};
