export const updateEmailSwagger = {
  paths: {
    "/update-email": {
      post: {
        summary: "Requests an email address change",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        responses: {
          200: {
            description: "Email sent successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
  },
};

export const forgotPasswordSwagger = {
  paths: {
    "/forgot-password": {
      post: {
        summary: "Requests a password recovery email",
        security: [{ bearerAuth: [] }],
        tags: ["users"],
        responses: {
          200: {
            description: "Password recovery email sent successfully",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
  },
};
