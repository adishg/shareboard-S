import { CONSTANT } from "../constants/constants";
import { URLS } from "../constants/urls";
import { HTTP_RESPONSE } from "../enums/http-responses.enum";
import { ILogin } from "../models/login-payload.model";
import { ILoginResponse } from "../models/login-response.model";
import { APIService } from "./api/api-service";

export const getRoomInfo = async (payload: ILogin) => {
  try {
    const response = await APIService.Instance.post(URLS.LOGIN, payload);
    if (response.status === HTTP_RESPONSE.SUCCESS) {
      const data: ILoginResponse = response.data;
      if (data.status) {
        localStorage.setItem(
          CONSTANT.USER_DETAILS,
          JSON.stringify(data.userDetail),
        );
        localStorage.setItem(CONSTANT.TOKEN, data.token);
      }
    } else {
      localStorage.removeItem(CONSTANT.TOKEN);
    }
    return response;
  } catch (err) {
    // TODO add error handling
    localStorage.removeItem(CONSTANT.TOKEN);
  }
};