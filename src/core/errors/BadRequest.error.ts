import AppError from "./AppError.error";

class BadRequest extends AppError {
  constructor(message: string) {
    super(
      message || "O servidor não sabe o que fazer com isso... desculpa.",
      400,
    );
  }
}

export default BadRequest;
