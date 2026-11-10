import { Pantry } from "@src/core/types/pantry/Pantry.types";
import PantryRepository from "../repository/Pantry.repository";

const pr = new PantryRepository();

class GetMyPantries {
  async getMyPantries(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<Pantry[]> {
    const response = await pr.getMyPantries(userId, offset, limit);
    return response;
  }
}

export default GetMyPantries;
