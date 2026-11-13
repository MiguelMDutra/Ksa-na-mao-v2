import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export class PantryModel extends Model<
  InferAttributes<PantryModel>,
  InferCreationAttributes<PantryModel>
> {
  declare pantryId: number;
  declare ownerId: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

export interface PantryCreate {
  ownerId: number;
  name: string;
}

export interface PantryUpdate {
  pantryId: number;
  ownerId: number;
  name: string;
}
