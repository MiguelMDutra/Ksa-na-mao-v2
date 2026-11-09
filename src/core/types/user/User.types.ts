//Utilizador

export interface userAll {
  userId: number;
  username: string;
  password: string;
  email: string;
  pfp: string | null;
  name: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  passwordUpdatedAt: Date | null;
  emailUpdatedAt: Date | null;
  usernameUpdatedAt: Date | null;
}

export type userAllNoPassword = Omit<userAll, "password">;

//Entrada

export interface signUpData {
  username: string;
  email: string;
  password: string;
}

export type userUpdate = Partial<
  Pick<userAll, "name" | "bio" | "username" | "email" | "password" | "pfp">
>;

//Publico

export interface getOneUserData {
  userId: number;
  username: string;
  pfp?: string;
  name?: string;
  bio?: string;
  createdAt: string;
}

export interface searchUsers {
  userId: number;
  username: string;
  pfp?: string;
  name?: string;
}

//Interno

export interface userBasics {
  userId: number;
  email: string;
}

export interface userBasicsPassword extends userBasics {
  password: string;
}

export interface updateData {
  userId: number;
  name: string;
  username: string;
  bio: string;
}
