import BadRequest from "@src/core/errors/BadRequest.error";
import { UnitUpdate } from "@src/core/types/ingredient/Unit.types";
import { MessageOnly } from "@src/core/types/auxiliary-types/responses/messageOnly";
import UnitRepo from "../../repository/units/Unit.repository";
import Conflict from "@src/core/errors/Conflict.error";

const ur = new UnitRepo();

class UpdateUnit {
  async execute(data: UnitUpdate, unitId: number): Promise<MessageOnly> {
    if (unitId === 0) throw new BadRequest("Id da unidade de medida inválido");
    if (!data.name || !data.abbreviation || !data.type) {
      throw new BadRequest("Está faltando um dado obrigatório.");
    }

    if (data.type !== "Solido" && data.type !== "Liquido") {
      throw new BadRequest("Tipo errado.");
    }

    const unit = await ur.getUnits({
      unitId: unitId,
    });

    if (!unit)
      throw new BadRequest("Não existe uma unidade de medida para esse id.");

    const realName = data.name ? data.name : unit[0].name;
    const realAbbreviation = data.abbreviation
      ? data.abbreviation
      : unit[0].abbreviation;
    const realType = data.type ? data.type : unit[0].type;
    const response = await ur.getUnits({
      name: data.name,
      abbreviation: data.abbreviation,
      type: data.type,
    });

    if (response.length > 0)
      throw new Conflict(
        "Já existe uma unidade de medida com essas informações.",
      );

    const affectedCount = await ur.updateUnit(
      {
        name: realName,
        abbreviation: realAbbreviation,
        type: realType,
      } as UnitUpdate,
      unitId,
    );

    if (!affectedCount)
      throw new BadRequest("Essa unidade de medida já existe!");

    return {
      message: `${affectedCount} informaçäo(öes) alteradas com sucesso!`,
    };
  }
}

export default UpdateUnit;
