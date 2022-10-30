import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const refresh = useRefreshToken();
const { auth } = useAuth();

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config.headers!["Authorization"]) {
    config.headers!["Authorization"] = auth?.token;
  }
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = async (error: any): Promise<AxiosError> => {
  const prevRequest = error?.config;
  if (error?.response?.status === 403 && !prevRequest?.sent) {
    prevRequest.sent = true;
    const newAccessToken = await refresh();
    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return axiosPrivate(prevRequest);
  }
  return Promise.reject(error);
};

const useAxiosPrivate =(axiosInstance: AxiosInstance): AxiosInstance=> {
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(onRequest, onRequestError);
    const responseIntercept = axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosInstance;
}
export default useAxiosPrivate;
