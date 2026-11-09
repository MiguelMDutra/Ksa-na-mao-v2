import { AuthUser } from "./userAuthNExpress/authUser.types";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
