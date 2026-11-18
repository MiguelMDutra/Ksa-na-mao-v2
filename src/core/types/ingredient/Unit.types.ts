import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export class UnitModel extends Model<
  InferAttributes<UnitModel>,
  InferCreationAttributes<UnitModel>
> {
  declare id: number;
  declare name: string;
  declare abbreviation: string;
  declare type: string;
}

export interface UnitCreate {
  name: string;
  abbreviation: string;
  type: "Solido" | "Liquido";
}
