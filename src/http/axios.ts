import axios, { AxiosRequestConfig } from "axios";

export default class HTTP {
  async makeRequest(url: string, method: string, config?: AxiosRequestConfig) {
    return axios[method](url, config);
  }
}
