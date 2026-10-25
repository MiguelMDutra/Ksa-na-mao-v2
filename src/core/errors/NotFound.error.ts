import AppError from "./AppError.error";

class NotFound extends AppError {
  constructor(message: string) {
    super(message || "Recurso não encontrado", 404);
  }
}

export default NotFound;
