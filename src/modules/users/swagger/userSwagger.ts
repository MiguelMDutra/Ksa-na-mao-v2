import { authSwagger } from "./auth";
import { updateSwagger } from "./update";

export const userSwagger = {
  paths: {
    ...authSwagger.paths,
    ...updateSwagger.paths,
  },
};
