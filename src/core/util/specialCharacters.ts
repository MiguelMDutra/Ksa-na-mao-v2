import AppError from "../errors/AppError.error";

export function hasSpecialCharacters(w: string): boolean {
  return /[^\w\s]/.test(w);
}

export function validateHasSpecialCharacter(w: string): void {
  if (hasSpecialCharacters(w)) {
    throw new AppError("Esse campo não permite caracteres especiais.");
  }
}
