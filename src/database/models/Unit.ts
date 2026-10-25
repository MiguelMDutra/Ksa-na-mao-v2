import { DataTypes, Model, Sequelize } from "sequelize";
import type { DatabaseModels } from "./index";

class Unit extends Model {
  declare id: number;
  declare name: string;
  declare abbreviation: string;
  declare type: string;

  static associate(models: DatabaseModels) {
    this.hasMany(models.recipeIngredient, {
      foreignKey: "unitId",
      as: "recipeEntries",
    });
  }
}

export default (sequelize: Sequelize) => {
  Unit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      abbreviation: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("Solido", "Liquido"),
        defaultValue: "Solido",
        allowNull: false,
      },
    },
    { sequelize, modelName: "Unit", tableName: "Units", paranoid: true },
  );
  return Unit;
};
