import { loginSwagger } from "./login.swagger";
import { signUpSwagger } from "./signUp.swagger";

export const authSwagger = {
  paths: {
    ...loginSwagger.paths,
    ...signUpSwagger.paths,
  },
};
