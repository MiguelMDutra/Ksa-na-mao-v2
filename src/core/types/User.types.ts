export interface signUpData {
  username: string;
  email: string;
  password: string;
}

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

export interface userAll {
  userId: number;
  username: string;
  email: string;
  password: string;
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

export interface userFindOne {
  userId: number;
  username: string;
  email: string;
  pfp: string | null;
  name: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface userBasics {
  userId: number;
  email: string;
}

export interface userBasicsPassword extends userBasics {
  password: string;
}
