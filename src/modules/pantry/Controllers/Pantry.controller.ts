import { NextFunction, Request, Response } from "express";
import CreatePantry from "../useCases/pantry/CreatePantry";
import DeletePantry from "../useCases/pantry/DeletePantry";
import GetMyPantries from "../useCases/pantry/GetMyPantries";
import GetPantryInfos from "../useCases/pantry/GetPantryInfos";
import UpdatePantry from "../useCases/pantry/UpdatePantry";

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
    const { page } = req.query;

    const numberPage = Number(page);

    const finalOffset =
      typeof page === "string" &&
      Number.isInteger(numberPage) &&
      numberPage >= 1 &&
      numberPage <= 2
        ? (numberPage - 1) * 5
        : 0;

    const response = await getMyPantries.getMyPantries(userId, finalOffset, 5);

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
