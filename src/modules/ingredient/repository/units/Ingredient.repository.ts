import { UnitModel } from "@src/core/types/ingredient/Unit.types";
import models from "@src/database/models";
import { WhereOptions } from "sequelize";

const unitModel = models.unit;

class UnitRepo {
  async getUnits(where?: WhereOptions): Promise<UnitModel[]> {
    return await unitModel.findAll({ where: where });
  }
}
export default UnitRepo;
