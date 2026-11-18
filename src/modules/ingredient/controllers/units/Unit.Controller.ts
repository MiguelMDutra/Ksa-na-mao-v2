import { NextFunction, Request, Response } from "express";
import createWhere from "../../../../helpers/createWhere";
import GetUnits from "../../useCases/units/GetUnit";
const gu = new GetUnits();

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
}

export default UnitController;
