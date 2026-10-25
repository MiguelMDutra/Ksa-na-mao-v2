import AppError from "./AppError.error";

class MethodNotAllowed extends AppError {
  constructor(message?: string) {
    super(message || "Esse recurso não aceita esse tipo de ação.", 405);
  }
}
export default MethodNotAllowed;
