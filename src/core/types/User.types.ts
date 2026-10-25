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
