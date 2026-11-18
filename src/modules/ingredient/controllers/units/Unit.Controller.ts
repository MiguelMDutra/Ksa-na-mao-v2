import { NextFunction, Request, Response } from "express";
import createWhere from "../../../../helpers/createWhere";
import GetUnits from "../../useCases/units/GetUnit";
import CreateUnit from "../../useCases/units/CreateUnit";
const gu = new GetUnits();
const cu = new CreateUnit();

class UnitController {
  async getUnits(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id, name, abbreviation, type } = req.query;
      const where = createWhere({ id, name, abbreviation, type });
      const response = await gu.execute(where);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createUnit(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;
      const response = await cu.execute(data);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UnitController;
