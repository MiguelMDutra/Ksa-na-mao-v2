export interface createListItem {
  shoppingListId: number;
  ingredientId: number;
  amount: number;
}

export interface getListItem {
  shoppingListItemId: number;
  shoppingListId: number;
  ingredientId: number;
  amount: number;
  purchasedAt?: Date;
}
