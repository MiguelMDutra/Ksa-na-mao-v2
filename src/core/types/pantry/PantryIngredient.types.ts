import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export class PantryIngredientModel extends Model<
  InferAttributes<PantryIngredientModel>,
  InferCreationAttributes<PantryIngredientModel>
> {
  declare pantryId: number;
  declare ingredientId: number;
  declare currentQuantity: number;
  declare minimumQuantity: number;
  declare expirationDate: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

export interface PantryIngredientCreate {
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}

export interface PantryIngredientUpdate {
  id: number;
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}
