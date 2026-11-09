import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export class PantryIngredient extends Model<
  InferAttributes<PantryIngredient>,
  InferCreationAttributes<PantryIngredient>
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

export interface createPantryIngredient {
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}

export interface updatePantryIngredient {
  id: number;
  pantryId: number;
  ingredientId: number;
  currentQuantity: number;
  minimumQuantity: number;
  expirationDate?: Date;
}
