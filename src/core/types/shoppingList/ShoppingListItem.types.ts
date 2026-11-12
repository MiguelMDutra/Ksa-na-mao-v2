export interface ListItemCreate {
  shoppingListId: number;
  ingredientId: number;
  amount: number;
}

export interface ListItemGet {
  shoppingListItemId: number;
  shoppingListId: number;
  ingredientId: number;
  amount: number;
  purchasedAt?: Date;
}
