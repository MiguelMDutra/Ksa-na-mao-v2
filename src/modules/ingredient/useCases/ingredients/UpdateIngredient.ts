import BadRequest from "@src/core/errors/BadRequest.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import AppError from "@src/core/errors/AppError.error";
import { updateIngredient } from "@src/core/types/Ingredient.types";
import IngredientHelper from "../../../ingredient/repository/ingredients/Ingredients.HELPER";
import IngredientRepo from "../../../ingredient/repository/ingredients/Ingredient.repository";

const ih = new IngredientHelper();
const ir = new IngredientRepo();

class UpdateIngredient {
  async execute(
    data: updateIngredient,
    id: number,
    userId: number,
  ): Promise<object> {
    if (
      Object.keys(data).length === 0 ||
      (!data.name.trim() && !data.type && !data.isPublic)
    ) {
      throw new BadRequest("Você precisa mudar algo para atualizar!");
    }

    const ingredient = await ih.findUsersIngredient({
      userId: userId,
      ingredientId: id,
    });
    if (!ingredient)
      throw new Forbidden(
        "Você não tem permissão para atualizar esse ingrediente!",
      );

    data.name = data.name !== null ? data.name : ingredient.name;

    const newType =
      data.type === "Solido" || data.type === "Liquido"
        ? data.type
        : ingredient.type;
    data.type = newType as "Solido" | "Liquido";

    const newIsPublic =
      typeof data.isPublic === "boolean" ? data.isPublic : ingredient.isPublic;
    data.isPublic = newIsPublic as boolean;

    if (
      data.name === ingredient.name &&
      data.isPublic === ingredient.isPublic &&
      data.type === ingredient.type
    ) {
      throw new BadRequest("Você precisa mudar algo para atualizar.");
    }

    const response = await ir.update(data, {
      userId: userId,
      ingredientId: id,
    });
    if (response === 0)
      throw new AppError("Nada foi atualizado... Erro no servidor!");
    else return { message: "Ingrediente atualizado com sucesso!" };
  }
}

export default UpdateIngredient;
