import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Ingredient extends Model<
  InferAttributes<Ingredient>,
  InferCreationAttributes<Ingredient>
> {
  declare ingredientId: CreationOptional<number>;
  declare userId: number;
  declare name: string;
  declare type: string;
  declare isPublic: boolean;
}

export interface CreateIngredient {
  userId: number;
  name: string;
  type?: "Solido" | "Liquido";
  isPublic?: boolean;
}

export interface UpdateIngredient {
  name: string;
  type: "Solido" | "Liquido";
  isPublic: boolean;
}
