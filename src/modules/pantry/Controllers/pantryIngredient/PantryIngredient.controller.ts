import { Request, Response } from "express";
import CreatePantryIngredient from "../../useCases/pantryIngredient/CreatePantryIngredient";
import UpdatePantryIngredient from "../../useCases/pantryIngredient/UpdatePantryIngredients";
import GetPantryIngredients from "../../useCases/pantryIngredient/GetPantryIngredients";
import pagination from "@src/helpers/pagination";
import getParamNumber from "@src/helpers/getParamNumber";

const getPantryIngredients = new GetPantryIngredients();
const createPantryIngredient = new CreatePantryIngredient();
const updatePantryIngredient = new UpdatePantryIngredient();

class PantryIngredientController {
  async getPantryIngredients(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { pantryId } = req.params;
    const { page, limit } = req.query;

    const response = await getPantryIngredients.execute(
      getParamNumber(pantryId),
      userId,
      {
        offset: pagination(getParamNumber(page)) - 5,
        limit: getParamNumber(limit),
      },
    );

    res.status(200).json(response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { pantryId } = req.params;
    const { ingredients } = req.body;
    const { userId } = req.user!;

    await createPantryIngredient.execute(
      getParamNumber(pantryId),
      ingredients,
      userId,
    );

    res.status(201).json({
      message: "Ingredientes adicionados à despensa com sucesso!",
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { pantryId, ingredientId } = req.params;
    const { data } = req.body;
    const { userId } = req.user!;

    await updatePantryIngredient.execute(
      data,
      getParamNumber(pantryId),
      getParamNumber(ingredientId),
      userId,
    );

    res.status(200).json({
      message: "Ingredientes atualizados com sucesso!",
    });
  }
}

export default PantryIngredientController;
