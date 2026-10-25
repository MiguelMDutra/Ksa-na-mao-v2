import AppError from "./AppError.error";

class Conflict extends AppError {
  constructor(message?: string) {
    super(
      message ||
        "Algum elemento seu já tem esse nome ou causou algum outro conflito.",
      409,
    );
  }
}
export default Conflict;
