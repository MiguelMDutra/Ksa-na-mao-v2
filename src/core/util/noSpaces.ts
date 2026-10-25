import AppError from "../errors/AppError.error";

export function hasSpaces(w: string): boolean {
  return /\s+/.test(w);
}

export function validateHasNoSpaces(w: string): void {
  if (hasSpaces(w)) {
    throw new AppError("Esse campo não permite espaços.");
  }
}
