import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export class UnitModel extends Model<
  InferAttributes<UnitModel>,
  InferCreationAttributes<UnitModel>
> {
  declare id: number;
  declare name: string;
  declare abbreviation: string;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

export interface UnitCreate {
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}

export interface UnitUpdate {
  name?: string;
  abbreviation?: string;
  type?: "Solido" | "Liquido";
}
