import { CONSTANT } from "../constants/constants";
import { URLS } from "../constants/urls";
import { HTTP_RESPONSE } from "../enums/http-responses.enum";
import { ILogin } from "../models/login-payload.model";
import { ILoginResponse } from "../models/login-response.model";
import { IRegister } from "../models/register-payload.model";
import { APIService } from "./api/api-service";

export const login = async (payload: ILogin) => {
  try {
    const response = await APIService.Instance.post(URLS.LOGIN, payload);
    if (response.status === HTTP_RESPONSE.SUCCESS) {
      const data: ILoginResponse = response.data;
      if (data.status) {
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

export const register = async (payload: IRegister) => {
  let response;
  try {
    response = await APIService.Instance.post(URLS.REGISTER, payload);
    const data: ILoginResponse = response.data;
    if (response.status === HTTP_RESPONSE.SUCCESS) {
      if (data.status) {
        localStorage.setItem(CONSTANT.TOKEN, data.token);
      }
    } else {
      localStorage.removeItem(CONSTANT.TOKEN);
    }
    return data;
  } catch (err) {
    // TODO add error handling
    // console.log(err);
    alert(err.response.data.message);
    localStorage.removeItem(CONSTANT.TOKEN);
  }
};

export const signOut = () => {
  localStorage.removeItem(CONSTANT.TOKEN);
  return true;
};
