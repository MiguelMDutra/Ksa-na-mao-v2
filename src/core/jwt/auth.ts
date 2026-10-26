import { UserFindOne } from "../types/User.types";
import jwt from "jsonwebtoken";

export function auth(user: UserFindOne): string {
  return jwt.sign(user!, process.env.JSONKEY as string, {
    expiresIn: "1h",
  });
}

export default auth;
