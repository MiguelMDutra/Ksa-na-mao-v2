export interface CreateListItem {
  shoppingListId: number;
  ingredientId: number;
  amount: number;
}

export interface GetListItem {
  shoppingListItemId: number;
  shoppingListId: number;
  ingredientId: number;
  amount: number;
  purchasedAt?: Date;
}
