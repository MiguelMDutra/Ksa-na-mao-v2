//Utilizador

export interface UserAll {
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

export type userAllNoPassword = Omit<UserAll, "password">;

//Entrada

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export type UserUpdate = Partial<
  Pick<UserAll, "name" | "bio" | "username" | "email" | "password" | "pfp">
>;

//Publico

export interface GetOneUserData {
  userId: number;
  username: string;
  pfp?: string;
  name?: string;
  bio?: string;
  createdAt: string;
}

export interface SearchUsers {
  userId: number;
  username: string;
  pfp?: string;
  name?: string;
}

//Interno

export interface UserBasics {
  userId: number;
  email: string;
}

export interface UserBasicsPassword extends UserBasics {
  password: string;
}

export interface UpdateData {
  userId: number;
  name: string;
  username: string;
  bio: string;
}
