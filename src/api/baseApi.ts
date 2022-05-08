
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import logger from "@/log/baselog";
import {getStore} from "@/store";

const store = getStore();

const Api = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000,
    headers: {
        'content-type': 'application/json'
    }
});

Api.interceptors.request.use(defaultRequestInterceptors, defaultRequestError);


Api.interceptors.response.use(defaultResponseInterceptors, defaultResponseError);

/**
 * 默认请求错误处理
 * @param error
 */
function defaultRequestError(error: AxiosError): AxiosError {
    logger.info('defaultRequestError 执行')
    return error
}

/**
 * 默认请求拦截器
 * @param value
 */
function defaultRequestInterceptors(value: AxiosRequestConfig) {

    if (store.state.isLogin) {
        if (value.headers) {
            value.headers.Authorization = "BEARER "+store.getters.getToken;
            // value.headers.Auth = store.getters.getToken;
            logger.info("用户已登录", JSON.stringify(value.headers))
        }
    }
    logger.info('defaultRequestInterceptors 执行')
    return value;
}

/**
 * 默认响应错误处理
 * @param error
 */
function defaultResponseError(error: AxiosError): AxiosError {
    logger.info('defaultResponseError 执行',error)
    return error;
}

/**
 * 默认响应拦截器
 * @param resp
 */
function defaultResponseInterceptors(resp: AxiosResponse) : AxiosResponse| void {
    logger.info('defaultResponseInterceptors 执行')
    return resp
}


export default Api;
