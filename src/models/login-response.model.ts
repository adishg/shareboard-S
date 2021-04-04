import { IUserDetail } from "./user-detail.model";

export interface ILoginResponse {
  status: boolean;
  token: string;
  userDetail: IUserDetail;
  message?: string;
}
