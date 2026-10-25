export interface createIngredient {
  userId: number;
  name: string;
  type: "Solido" | "Liquido";
  isPublic: boolean;
}

export interface updateIngredient {
  ingredientId: number;
  userId: number;
  name: string;
  type: "Solido" | "Liquido";
  isPublic: boolean;
}
