export interface RecipeCreateOrUpdate {
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
}

export interface RecipeGet {
  recipeId: number;
  userId: number;
  originalRecipeId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  category: string;
  createdAt: Date;
}
