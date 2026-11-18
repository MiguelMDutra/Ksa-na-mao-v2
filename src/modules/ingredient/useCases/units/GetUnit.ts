import { WhereOptions } from "sequelize";
import { UnitModel } from "@src/core/types/ingredient/Unit.types";
import UnitRepo from "../../repository/units/Ingredient.repository";

const ur = new UnitRepo();

class GetUnits {
  async execute(where: WhereOptions): Promise<UnitModel[]> {
    return await ur.getUnits(where);
  }
}

export default GetUnits;
