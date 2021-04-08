export interface IRegister {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  captcha: string;
  confirmPassword?: string;
}
