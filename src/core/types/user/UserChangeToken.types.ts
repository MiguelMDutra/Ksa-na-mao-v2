export interface UserTokenCreate {
  userId: number;
  token: string;
  resetEmail: string;
  used: boolean;
}
