import BadRequest from "@src/core/errors/BadRequest.error";
import Conflict from "@src/core/errors/Conflict.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import AppError from "@src/core/errors/AppError.error";
import NotFound from "@src/core/errors/NotFound.error";
import { PantryUpdate } from "@src/core/types/pantry/Pantry.types";
import { MessageOnly } from "@src/core/types/auxiliary-types/responses/messageOnly";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";
import PantryRepository from "../../repository/pantry/Pantry.repository";

const pr = new PantryRepository();
const ph = new PantryHelper();

class UpdatePantry {
  async updateNamePantry(
    data: PantryUpdate,
    id: number,
    userId: number,
  ): Promise<MessageOnly> {
    if (data.ownerId) {
      throw new BadRequest("Você não pode atualizar o dono do estoque aqui.");
    }

    if (typeof data.name !== "string" || !data.name.trim()) {
      throw new BadRequest("Você precisa informar um nome válido.");
    }

    const pantryExists = await ph.pantryExists(id);
    if (!pantryExists) throw new NotFound("Estoque perdido.");

    const isOwner = await ph.isUserOwner(id, userId);
    if (!isOwner) {
      throw new Forbidden("Você só pode atualizar as suas próprias coisas!");
    }

    const isDuplicated = await ph.isDuplicated(userId, data.name);
    if (isDuplicated) {
      throw new Conflict("Você já tem um estoque com esse nome.");
    }

    const update = await pr.updatePantry(data, id);
    if (update) return { message: "Estoque atualizado com sucesso!" };
    else throw new AppError("O servidor não conseguiu acabar a atualização");
  }
}

export default UpdatePantry;
