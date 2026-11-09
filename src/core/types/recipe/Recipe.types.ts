export interface createOrUpdateRecipe {
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
}

export interface getRecipe {
  recipeId: number;
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
  createdAt: Date;
}
