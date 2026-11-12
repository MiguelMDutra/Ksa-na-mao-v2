import BadRequest from "@src/core/errors/BadRequest.error";
import Conflict from "@src/core/errors/Conflict.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import AppError from "@src/core/errors/AppError.error";
import { PantryUpdate } from "@src/core/types/pantry/Pantry.types";
import PantryHelper from "../repository/Pantry.HELPER";
import PantryRepository from "../repository/Pantry.repository";

const pr = new PantryRepository();
const ph = new PantryHelper();

class UpdatePantry {
  async updateNamePantry(
    data: PantryUpdate,
    id: number,
    userId: number,
  ): Promise<object> {
    if (data.ownerId) {
      throw new BadRequest("Você não pode atualizar o dono do estoque aqui.");
    }

    if (typeof data.name !== "string" || !data.name.trim()) {
      throw new BadRequest("Você precisa informar um nome válido.");
    }

    const isOwner = await ph.isUserOwner(id, userId);

    if (isOwner) {
      const allNames = await ph.isDuplicated(userId, data.name);

      if (!allNames) {
        const update = await pr.updatePantry(data, id);
        if (update) return { message: "Estoque atualizado com sucesso!" };
        else
          throw new AppError("O servidor não conseguiu acabar a atualização");
      }
      throw new Conflict("Você já tem um estoque com esse nome.");
    } else {
      throw new Forbidden("Você só pode atualizar as suas próprias coisas!");
    }
  }
}

export default UpdatePantry;
