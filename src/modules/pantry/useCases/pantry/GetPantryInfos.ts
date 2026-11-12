import { pantry } from "@src/core/types/pantry/Pantry.types";
import NotFound from "@src/core/errors/NotFound.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import PantryRepository from "../../repository/pantry/Pantry.repository";
import PantryUsersRepository from "../../repository/pantryUser/Pantry.repository";

const pur = new PantryUsersRepository();
const pr = new PantryRepository();

class GetPantryInfos {
  async getPantryInfos(pantryId: number, userId: number): Promise<pantry> {
    const membership = await pur.isUserInPantry(userId, pantryId);

    if (!membership) {
      throw new Forbidden("Você nao quer ver isso...");
    }

    const pantry = await pr.getPantryInfos(pantryId);

    if (pantry) return pantry;
    else throw new NotFound("Estoque perdido.");
  }
}

export default GetPantryInfos;
