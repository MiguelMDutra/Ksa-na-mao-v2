export interface createShoppingList {
  userId: number;
  pantryId: number;
}

export interface getShoppingList {
  shoppingListId: number;
  userId: number;
  pantryId: number;
}
