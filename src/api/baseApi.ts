
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout:1000,
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
    return error
}

/**
 * 默认请求拦截器
 * @param value
 */
function defaultRequestInterceptors(value: AxiosRequestConfig) {
    console.log(value);
    return value;
}

/**
 * 默认响应错误处理
 * @param error
 */
function defaultResponseError(error: AxiosError): AxiosError {
    return error;
}

/**
 * 默认响应拦截器
 * @param resp
 */
function defaultResponseInterceptors(resp: AxiosResponse) : AxiosResponse| void {
    console.log(resp)
    return resp
}


export default Api;
