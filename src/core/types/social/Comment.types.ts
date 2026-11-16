export interface CommentCreate {
  userId: number;
  recipeId: number;
  text: string;
}

export interface CommentGet {
  id: number;
  userId: number;
  recipeId: number;
  text: string;
}
