import { UserBasics } from "../types/user/User.types";
import jwt from "jsonwebtoken";

export function auth(user: UserBasics): string {
  return jwt.sign(user!, process.env.JSONKEY as string, {
    expiresIn: "1h",
  });
}

export default auth;
