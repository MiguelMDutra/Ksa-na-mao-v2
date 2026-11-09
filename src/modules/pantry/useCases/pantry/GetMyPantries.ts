import { pantry } from "@src/core/types/Pantry.types";
import PantryRepository from "../../repository/pantry/Pantry.repository";

const pr = new PantryRepository();

class GetMyPantries {
  async getMyPantries(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<pantry[]> {
    const response = await pr.getMyPantries(userId, offset, limit);
    return response;
  }
}

export default GetMyPantries;
