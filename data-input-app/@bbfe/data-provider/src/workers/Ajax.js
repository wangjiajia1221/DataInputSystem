import {getParamSerializer} from "../utils";
import axios from "axios";
import Const from "../const";
import createError from "../utils/createError";
const ERROR_TYPE = Const.ERROR_TYPE;
const JSON = (typeof window === "undefined" ? global : window).JSON || {};
// 异常数据结构
const errorResponseStruct = {httpStatusCode: NaN, code: NaN, message: ""};
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 * @refer https://github.com/mzabriskie/axios/blob/master/lib/utils.js
 */
const isObject = function isObject(val){
  return val !== null && typeof val === "object";
};

const transformMissionConfig = function transformMissionConfig(config){
  /**
   * @PATCH 
   * 
   * @description 支持传入自定义headers, 配置axios.default.headers
   * @date 2017-12-07
   */
  let defaultHeaders = axios.defaults.headers;
  let headers = config.headers;
  let specialMethods = [ "post", "put", "patch" ];

  if (isObject(headers)) {
    specialMethods.forEach(method => {
      Object.assign(defaultHeaders[method], headers);
    });
  }

  const paramSerializer = getParamSerializer(
    config.paramSerializerJQLikeEnabled
  );

  let transformedConfig = Object.assign({}, config);
  /**
   * @PATCH 
   * @desc  设置 http request body, 仅当http method 为 'PUT', 'POST', and 'PATCH' 时才设置
   * @see https://github.com/axios/axios#request-config
   */
  if (
    specialMethods.indexOf(config.method) > -1 &&
    isObject(transformedConfig.data)
  ) {
    transformedConfig.data = paramSerializer(transformedConfig.data);
  }
  return transformedConfig;
};

class AjaxWorkerFactory {
  constructor(strategy) {
    this.injectStrategy(strategy);
  }

  injectStrategy(strategy) {
    if (strategy != null) {
      if (strategy.businessError) {
        this.businessErrorStrategy = strategy.businessError;
      }
    }
  }

  isUnValidateStatus(httpStatus) {
    // not 2xx or
    return httpStatus >= 300 || httpStatus < 200;
  }

  isErrorData(data) {
    // code exist and != 0
    return data && (data.error || (data.code && data.code !== 0));
  }

  defaultBizErrorStrategy(data, status, resolve, reject) {
    if (this.isUnValidateStatus(status) || this.isErrorData(data)) {
      let httpStatusCode = status;
      let {code, message} = data.error || data;

      let businessError = createError({code, message, httpStatusCode});
      reject(businessError);
    } else {
      resolve(data);
    }
  }

  do(mission) {
    return new Promise((resolve, reject) => {
      // axiosSchema: https://github.com/mzabriskie/axios
      let transformedConfig = transformMissionConfig(mission.config);
      axios
        .request(transformedConfig)
        .then(({data, status, statusText, headers, config, response}) => {
          if (Object.prototype.toString.call(data) !== "[object Object]") {
            try {
              /*
               * @description  [补丁]
               * restful 接口 返回 204 时，data 为 空字符串， 直接返回空字符串， 否则JSON.parse("")会抛出异常
               */
              data = status === 204 ? data : JSON.parse(data);
            } catch (e) {
              let message = "response is not a instance of JSON ";
              console.error("response of '%s' is not JSON ", config.url);
              let parserError = createError({
                message: message,
                type: ERROR_TYPE.PARSER
              });
              reject(parserError);
            }
          }
          //has data.error or data.code
          if (!this.businessErrorStrategy) {
            this.businessErrorStrategy = this.defaultBizErrorStrategy;
          }
          this.businessErrorStrategy(data, status, resolve, reject);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // abort error
            // console.log('Request canceled', error.message);
            let abortError = createError({
              message: error.message,
              type: ERROR_TYPE.ABORT,
              code: error.code
            });
            reject(abortError);
          } else if (error.code === "ECONNABORTED") {
            // timeout error
            let timeoutError = createError({
              message: error.message,
              type: ERROR_TYPE.TIMEOUT,
              code: error.code
            });
            reject(timeoutError);
          } else if (error.response) {
            // biz error
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            let networkError;
            let {status, statusText, headers, config, data} = error.response;

            if (!this.businessErrorStrategy) {
              this.businessErrorStrategy = this.defaultBizErrorStrategy;
            }
            this.businessErrorStrategy(data, status, resolve, reject);

            let {code, message} = data || {};
            let responseDataError = (data && data.error) || {};
            let type = ERROR_TYPE.NETWORK,
              httpStatusCode = status;
            // 兼容data.code 和 data.error这两种标志异常的方式， 优先选用code
            code = code || responseDataError.code;
            message = message || responseDataError.message || statusText;
            networkError = createError({type, httpStatusCode, code, message});
            reject(networkError);
          } else {
            // The request was made but no response was received
            // Something happened in setting up the request that triggered an Error
            let requestError = createError({
              message: error.message,
              type: ERROR_TYPE.NETWORK
            });
            reject(requestError);
          }
        });
    });
  }
}
export default AjaxWorkerFactory;
