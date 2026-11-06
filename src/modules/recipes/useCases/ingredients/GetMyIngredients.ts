import BadRequest from "@src/core/errors/BadRequest.error";
import { offsetLimit } from "@src/core/types/auxiliary-types/pagination.types";
import IngredientRepo from "../../repository/ingredients/Ingredient.repository";

const ir = new IngredientRepo();

class GetMyIngredients {
  async execute(
    { offset, limit }: offsetLimit,
    userId: number,
  ): Promise<object> {
    const response = await ir.getMyIngredients({ offset, limit }, userId);
    if (response.length > 0) return response;
    throw new BadRequest(
      "Não existe nenhum ingrediente ainda... que tal adicionar algum?",
    );
  }
}

export default GetMyIngredients;
