import { pantry } from "@src/core/types/pantry/Pantry.types";
import PantryRepository from "../repository/pantry/Pantry.repository";
import NotFound from "@src/core/errors/NotFound.error";
const pr = new PantryRepository();

class GetPantryInfos {
  async getPantryInfos(pantryId: number, userId: number): Promise<pantry> {
    // Const membership = await PantryUsers.findOne({
    //   Where: {
    //     PantryId: pantryId,
    //     UserId,
    //   },
    // });

    // If (!membership) {
    //   Throw new Forbidden("Você nao quer ver isso...");
    // }

    const pantry = await pr.getPantryInfos(pantryId);

    if (pantry) return pantry;
    else throw new NotFound("Estoque perdido.");
  }
}

export default GetPantryInfos;
