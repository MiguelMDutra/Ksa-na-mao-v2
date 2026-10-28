import db from "@models";

export async function clearDatabase(): Promise<void> {
  await db.sequelize.query(`
    TRUNCATE TABLE
      "Comments",
      "Followers",
      "Ingredients",
      "Likes",
      "Notifications",
      "Pantries",
      "PantryIngredients",
      "PantryInvites",
      "PantryUsers",
      "PreparationRecords",
      "RecipeIngredients",
      "Recipes",
      "SequelizeMeta",
      "ShoppingListItems",
      "ShoppingLists",
      "Units",
      "userChangeTokens",
      "Users"
    RESTART IDENTITY CASCADE;
  `);
}
