import AppError from "../errors/AppError.error";
import { hasSpecialCharacters } from "./specialCharacters";

export function goodPassword(w: string): void {
  if (!hasSpecialCharacters(w)) {
    throw new AppError("A senha precisa de pelo menos um caracter especial.");
  }
}
