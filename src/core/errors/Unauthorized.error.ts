import AppError from "./AppError.error";

class Unauthorized extends AppError {
  constructor(message?: string) {
    super(message || "Você não está autenticado. Faça-o, por favor.", 401);
  }
}
export default Unauthorized;
