import { NextFunction, Request, Response } from "express";
import createWhere from "../../../../helpers/createWhere";
import GetUnits from "../../useCases/units/GetUnit";
import CreateUnit from "../../useCases/units/CreateUnit";
import UpdateUnit from "../../useCases/units/UpdateUnit";
import getParamNumber from "@src/helpers/getParamNumber";
const gu = new GetUnits();
const cu = new CreateUnit();
const uu = new UpdateUnit();

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

  async updateUnit(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { unitId } = req.params;
      const data = req.body;
      const response = await uu.execute(data, getParamNumber(unitId));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default UnitController;
