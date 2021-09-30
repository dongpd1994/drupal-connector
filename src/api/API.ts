/**
 * @module API
 */

import axios, { AxiosInstance } from 'axios';
import { APIError } from './APIError ';
import { ConfigurationInterface } from '../Configuration';
import { querify } from '../utils/querify';
import _ from 'lodash';

export type APIMethod = 'get' | 'post';

export interface APIInterface {
  xhr: AxiosInstance;
  get<T extends any = any>(endpoint: string, params?: object): Promise<T>;
  post<T extends any = any>(
    endpoint: string,
    body: object,
    params?: object,
  ): Promise<T>;
}

export class API implements APIInterface {
  public xhr: AxiosInstance;

  public config: ConfigurationInterface;

  /**
   * Constructor of the API class.
   * 
   * @param config The configuration to use.
   */
  constructor(config: ConfigurationInterface) {
    this.config = config;

    const axiosOptions = {
      paramsSerializer: querify,
      timeout: 10 * 60 * 1000,
      withCredentials: true,
    };

    this.xhr = axios.create(axiosOptions);
  }

  /**
   * GET request.
   * 
   * @param endpoint The endpoint to send the request to.
   * @param params The extra query parameters to add in the request.
   * @returns Return a promise of the Axios Request.
   */
  get(endpoint: string, params = {}) {
    return this.request('get', endpoint, params);
  }

  /**
   * POST request.
   * 
   * @param endpoint The endpoint to send the request to.
   * @param body The request body.
   * @param params The extra query parameters to add in the request.
   * @returns Return a promise of the Axios Request.
   */
  post(endpoint: string, body: {}, params = {}) {
    return this.request('post', endpoint, params, body);
  }

  /**
   * Handle request
   * 
   * @param method The request type. Choose get, post.
   * @param endpoint The endpoint to perform the request to.
   * @param params The extra query parameters to add in the request.
   * @param data The data/body to add to the request.
   * @param headers The extra headers to add to the request.
   * @returns Return a promise of the Axios Request.
   */
  request(
    method: APIMethod,
    endpoint: string,
    params: {} = {},
    data: {} = {},
    headers: { [key: string]: string } = {},
  ) {
    if (!this.config.baseUrl) {
      throw new Error('Drupal Connector has no URL configured to send requests.');
    }

    let baseURL = `${this.config.baseUrl}`;

    if (!baseURL.endsWith('/')) baseURL += '/';

    const requestOptions = {
      baseURL,
      data,
      headers,
      method,
      params,
      url: endpoint,
      withCredentials: false,
    };

    requestOptions.headers['Content-Type'] = 'application/vnd.api+json';
    return this.xhr
      .request(requestOptions)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        const errorResponse = error.response || {};

        const errorResponseData = errorResponse.data || {};
        const baseErrorInfo = {
          url: requestOptions.url,
          method: requestOptions.method,
          params: requestOptions.params,
          message: errorResponseData.message || '',
          code: errorResponse.status || -1,
        };
        if (error && error.response && errorResponseData.error) {
          throw new APIError(
            errorResponseData.error.message || 'Unknown error occured',
            baseErrorInfo,
          );
        } else if (error.response && error.response.json === true) {
          throw new APIError('API returned invalid JSON', {
            ...baseErrorInfo,
            code: 422,
          });
        } else if (error && error.response && error.response.status === 404 && error.response.statusText === "Not Found") {
          throw new APIError('Not found API', {
            ...baseErrorInfo,
            code: 404,
          });
        } else {
          throw new APIError('Network error', {
            ...baseErrorInfo,
            code: -1,
          });
        }
      });
  }
}
