import {
  UnitCreate,
  UnitModel,
  UnitUpdate,
} from "@src/core/types/ingredient/Unit.types";
import models from "@src/database/models";
import { Op, WhereOptions } from "sequelize";

const unitModel = models.unit;

class UnitRepo {
  async getUnits(where?: WhereOptions): Promise<UnitModel[]> {
    return await unitModel.findAll({ where: where });
  }

  async createUnit(data: UnitCreate): Promise<[UnitModel, boolean]> {
    const [unit, created] = await unitModel.findOrCreate({
      where: {
        [Op.or]: [{ name: data.name }, { abbreviation: data.abbreviation }],
      },
      defaults: { ...data },
    });
    return [unit, created];
  }

  async updateUnit(data: UnitUpdate, unitId: number): Promise<number> {
    const [affectedCount] = await unitModel.update(data, { where: { unitId } });
    return affectedCount;
  }
}
export default UnitRepo;
