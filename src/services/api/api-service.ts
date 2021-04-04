import { Axios } from "./axios-class";
import { AxiosRequestConfig } from "axios";
import { CONSTANT } from "../../constants/constants";

export class APIService extends Axios {
  private static _instance: APIService;

  private constructor(conf: AxiosRequestConfig) {
    super(conf);
  }

  public static get Instance() {
    if (this._instance) {
      return this._instance;
    }
    const config = {
      baseURL: process.env.REACT_APP_SOCKET_SERVER_URL,
    };
    return (this._instance = new this(config));
  }

  getToken = (): string | null => {
    return localStorage.getItem(CONSTANT.TOKEN);
  };

  get = (url: string, config?: AxiosRequestConfig) => {
    return this._axiosInstance.get(url, config);
  };

  post = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return this._axiosInstance.post(url, data, config);
  };

  put = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return this._axiosInstance.put(url, data, config);
  };

  delete = (url: string, config?: AxiosRequestConfig) => {
    return this._axiosInstance.delete(url, config);
  };
}
