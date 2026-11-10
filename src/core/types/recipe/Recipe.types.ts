export interface CreateOrUpdateRecipe {
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
}

export interface GetRecipe {
  recipeId: number;
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
  createdAt: Date;
}
