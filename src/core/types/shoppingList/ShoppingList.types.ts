export interface ShoppingListCreate {
  userId: number;
  pantryId: number;
}

export interface ShoppingListGet {
  shoppingListId: number;
  userId: number;
  pantryId: number;
}
