import BadRequest from "@src/core/errors/BadRequest.error";
import { UnitCreate, UnitModel } from "@src/core/types/ingredient/Unit.types";
import { MessageOnly } from "@src/core/types/auxiliary-types/responses/messageOnly";
import UnitRepo from "../../repository/units/Ingredient.repository";

const ur = new UnitRepo();

class CreateUnit {
  async execute(data: UnitCreate): Promise<[UnitModel, MessageOnly]> {
    if (!data.name || !data.abbreviation || !data.type) {
      throw new BadRequest("Está faltando um dado obrigatório.");
    }

    if (data.type !== "Solido" && data.type !== "Liquido") {
      throw new BadRequest("Tipo errado.");
    }

    const [unit, created]: [UnitModel, boolean] = await ur.createUnit(data);

    if (!created) throw new BadRequest("Essa unidade de medida já existe!");

    return [unit, { message: "Unidade de medida criada com sucesso!" }];
  }
}

export default CreateUnit;
