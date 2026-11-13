import { PantryModel } from "@src/core/types/pantry/Pantry.types";
import NotFound from "@src/core/errors/NotFound.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import PantryRepository from "../../repository/pantry/Pantry.repository";
import PantryUsersRepository from "../../repository/pantryUser/Pantry.repository";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";

const ph = new PantryHelper();
const pur = new PantryUsersRepository();
const pr = new PantryRepository();

class GetPantryInfos {
  async getPantryInfos(pantryId: number, userId: number): Promise<PantryModel> {
    const pantryExists = await ph.pantryExists(pantryId);

    if (!pantryExists) throw new NotFound("Estoque perdido.");

    const membership = await pur.isUserInPantry(userId, pantryId);

    if (!membership) {
      throw new Forbidden("Você nao quer ver isso...");
    }

    const pantry = await pr.getPantryInfos(pantryId);

    return pantry!;
  }
}

export default GetPantryInfos;
