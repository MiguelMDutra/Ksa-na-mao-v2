export interface CreateShoppingList {
  userId: number;
  pantryId: number;
}

export interface GetShoppingList {
  shoppingListId: number;
  userId: number;
  pantryId: number;
}
