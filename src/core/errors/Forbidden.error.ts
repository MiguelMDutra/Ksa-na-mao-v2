import AppError from "./AppError.error";

class Forbidden extends AppError {
  constructor(message?: string) {
    super(message || "Você não tem permissão para está ação!", 403);
  }
}
export default Forbidden;
