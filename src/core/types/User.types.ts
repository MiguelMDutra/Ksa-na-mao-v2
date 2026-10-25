export interface signUpData {
  username: string;
  email: string;
  password: string;
}

export interface getOneUserData {
  userId: number;
  username: string;
  pfp: string;
  name?: string;
  bio: string;
  createdAt: string;
}

export interface searchUsers {
  userId: number;
  username: string;
  pfp: string;
  name?: string;
}

export type UserAll = {
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
};

export type UserFindOne = {
  userId: number;
  username: string;
  email: string;
  pfp: string | null;
  name: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
