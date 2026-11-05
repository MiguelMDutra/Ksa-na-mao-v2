import { createPantrySwagger } from "./pantry/create.swagger";
import { getMyPantriesSwagger } from "./pantry/getMyPantries.swagger";
import { getPantryInfosSwagger } from "./pantry/getPantryInfos.swagger";
import { updatePantrySwagger } from "./pantry/update.swagger";
import { deletePantrySwagger } from "./pantry/delete.swagger";

export const pantrySwagger = {
  paths: {
    "/": {
      ...createPantrySwagger.paths["/"],
      ...getMyPantriesSwagger.paths["/"],
    },

    "/{pantryId}": {
      ...getPantryInfosSwagger.paths["/{pantryId}"],
    },

    "/{id}": {
      ...updatePantrySwagger.paths["/{id}"],
      ...deletePantrySwagger.paths["/{id}"],
    },
  },
};
