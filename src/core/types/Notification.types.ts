export interface createNotification {
  receiverId: number;
  creatorId: number;
  recipeId?: number;
  commentId?: number;
  isSeen: boolean;
  type: "Like" | "Comentario";
  message?: string;
}
