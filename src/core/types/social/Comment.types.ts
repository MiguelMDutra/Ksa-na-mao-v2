export interface CreateComment {
  userId: number;
  recipeId: number;
  text: string;
}

export interface GetComment {
  id: number;
  userId: number;
  recipeId: number;
  text: string;
}
