import { Sequelize } from "sequelize";

const database =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_DATABASE
    : process.env.DB_DATABASE;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database,
});
console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);

import userModel from "./User";
import userChangeTokenModel from "./UserChangeToken";
import followerModel from "./Follower";
import pantryModel from "./Pantry";
import ingredientModel from "./Ingredient";
import unitModel from "./Unit";
import pantryUserModel from "./PantryUser";
import pantryInviteModel from "./PantryInvite";
import pantryIngredientModel from "./PantryIngredient";
import shoppingListModel from "./ShoppingList";
import shoppingListItemModel from "./ShoppingListItem";
import recipeModel from "./Recipe";
import recipeIngredientModel from "./RecipeIngredient";
import preparationRequestModel from "./PreparationRecords";
import commentModel from "./Comment";
import likeModel from "./Like";
import notificationModel from "./Notification";

const db = {
  user: userModel(sequelize),
  userChangeToken: userChangeTokenModel(sequelize),
  follower: followerModel(sequelize),
  pantry: pantryModel(sequelize),
  ingredient: ingredientModel(sequelize),
  unit: unitModel(sequelize),
  pantryUser: pantryUserModel(sequelize),
  pantryInvite: pantryInviteModel(sequelize),
  pantryIngredient: pantryIngredientModel(sequelize),
  shoppingList: shoppingListModel(sequelize),
  shoppingListItem: shoppingListItemModel(sequelize),
  recipe: recipeModel(sequelize),
  recipeIngredient: recipeIngredientModel(sequelize),
  preparationRequest: preparationRequestModel(sequelize),
  comment: commentModel(sequelize),
  like: likeModel(sequelize),
  notification: notificationModel(sequelize),
};

export type ModelName = keyof typeof db;

export type DatabaseModels = typeof db;

Object.values(db).forEach((model) => {
  if ("associate" in model && typeof model.associate === "function") {
    model.associate(db);
  }
});

export default {
  ...db,
  sequelize,
  Sequelize,
};
