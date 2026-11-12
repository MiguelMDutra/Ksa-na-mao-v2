import { Request, Response } from "express";
import CreatePantryIngredient from "../../useCases/pantryIngredient/CreatePantryIngredient";
import UpdatePantryIngredient from "../../useCases/pantryIngredient/UpdatePantryIngredients";
import GetPantryIngredients from "../../useCases/pantryIngredient/GetPantryIngredients";

const getPantryIngredients = new GetPantryIngredients();
const createPantryIngredient = new CreatePantryIngredient();
const updatePantryIngredient = new UpdatePantryIngredient();

class PantryIngredientController {
  async getPantryIngredients(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { pantryId } = req.params;
    const { limit } = req.query;

    const numberLimit = Number(limit);

    const finalLimit =
      typeof limit === "string" &&
      Number.isInteger(numberLimit) &&
      numberLimit < 50 &&
      numberLimit > 0
        ? numberLimit
        : 5;

    const response = await getPantryIngredients.execute(
      Number(pantryId),
      userId,
      {
        offset: finalLimit - 5,
        limit: finalLimit,
      },
    );

    res.status(200).json(response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { pantryId } = req.params;
    const { ingredients } = req.body;
    const { userId } = req.user!;

    await createPantryIngredient.execute(Number(pantryId), ingredients, userId);

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
      Number(pantryId),
      Number(ingredientId),
      userId,
    );

    res.status(200).json({
      message: "Ingredientes atualizados com sucesso!",
    });
  }
}

export default PantryIngredientController;
