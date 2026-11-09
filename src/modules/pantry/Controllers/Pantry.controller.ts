import { NextFunction, Request, Response } from "express";
import CreatePantry from "../useCases/CreatePantry";
import DeletePantry from "../useCases/pantry/DeletePantry";
import GetMyPantries from "../useCases/GetMyPantries";
import GetPantryInfos from "../useCases/GetPantryInfos";
import UpdatePantry from "../useCases/UpdatePantry";

const createPantry = new CreatePantry();
const deletePantry = new DeletePantry();
const getMyPantries = new GetMyPantries();
const getPantryInfos = new GetPantryInfos();
const updatePantry = new UpdatePantry();

class PantryController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req.user!;
      const response = await createPantry.execute({
        ...req.body,
        ownerId: userId,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { id } = req.params;

    const response = await deletePantry.execute(Number(id), userId);

    res.status(200).json(response);
  }

  async getMyPantries(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { limit } = req.query;

    const numberLimit = Number(limit);

    const finalLimit =
      typeof limit === "string" &&
      Number.isInteger(numberLimit) &&
      numberLimit < 50 &&
      numberLimit > 0
        ? numberLimit
        : 5;

    const response = await getMyPantries.getMyPantries(
      userId,
      finalLimit - 5,
      finalLimit,
    );

    res.status(200).json(response);
  }

  async getPantryInfos(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { pantryId } = req.params;

    const response = await getPantryInfos.getPantryInfos(
      Number(pantryId),
      userId,
    );

    res.status(200).json(response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const { userId } = req.user!;
    const { id } = req.params;

    const response = await updatePantry.updateNamePantry(
      req.body,
      Number(id),
      userId,
    );

    res.status(200).json(response);
  }
}

export default PantryController;
