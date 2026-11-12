import BadRequest from "@src/core/errors/BadRequest.error";
import Forbidden from "@src/core/errors/Forbidden.error";
import PantryRepository from "../../repository/pantry/Pantry.repository";
import PantryHelper from "../../repository/pantry/Pantry.HELPER";
import AppError from "@src/core/errors/AppError.error";

const ph = new PantryHelper();
const pr = new PantryRepository();

class DeletePantry {
  async execute(id: number, userId: number): Promise<object> {
    const howMany = await ph.howMany(userId);

    const creatorId = await ph.isUserOwner(id, userId);

    if (creatorId) {
      if (howMany > 1) {
        const deleted = await pr.deletePantry(id);
        if (deleted) return { message: "Estoque apagado com sucesso!" };
        throw new AppError("O servidor nao conseguiu acabar a exclusão");
      } else
        throw new BadRequest(
          "Você só pode apagar um estoque se você participa de mais de um.",
        );
    } else throw new Forbidden("Você só pode apagar os seus estoques.");
  }
}

export default DeletePantry;
