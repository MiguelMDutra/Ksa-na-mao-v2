export interface createPantryIngredient {
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}

export interface updatePantryIngredient {
  id: number;
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}
