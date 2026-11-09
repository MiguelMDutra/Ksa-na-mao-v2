export interface createComment {
  userId: number;
  recipeId: number;
  text: string;
}

export interface getComment {
  id: number;
  userId: number;
  recipeId: number;
  text: string;
}
