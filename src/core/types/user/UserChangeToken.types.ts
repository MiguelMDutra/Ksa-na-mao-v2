export interface CreateUserToken {
  userId: number;
  token: string;
  resetEmail: string;
  used: boolean;
}
