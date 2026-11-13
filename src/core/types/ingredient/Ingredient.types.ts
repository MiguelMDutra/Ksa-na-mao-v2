import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class IngredientModel extends Model<
  InferAttributes<IngredientModel>,
  InferCreationAttributes<IngredientModel>
> {
  declare ingredientId: CreationOptional<number>;
  declare userId: number;
  declare name: string;
  declare type: string;
  declare isPublic: boolean;
}

export interface IngredientCreate {
  userId: number;
  name: string;
  type?: "Solido" | "Liquido";
  isPublic?: boolean;
}

export interface IngredientUpdate {
  name: string;
  type: "Solido" | "Liquido";
  isPublic: boolean;
}
