/**
 * @module API
 */

import axios, { AxiosInstance } from 'axios';
import { APIError } from './APIError ';
import { ConfigurationInterface } from 'src/Configuration';
import Qs from "querystring";
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
   * @param {ConfigurationInterface} config
   *   The configuration to use.
   */
  constructor(config: ConfigurationInterface) {
    this.config = config;

    const axiosOptions = {
      paramsSerializer: function (params: any) {
        return Qs.stringify(params)
      },
      timeout: 10 * 60 * 1000,
      withCredentials: true,
    };

    this.xhr = axios.create(axiosOptions);
  }

  /**
   * GET request.
   *
   * @param {string} endpoint
   *   The endpoint to send the request to.
   * @param {object} params
   *   The extra query parameters to add in the request.
   *
   * @return {Promise}
   *   Return a promise of the Axios Request.
   */
  get(endpoint: string, params = {}) {
    return this.request('get', endpoint, params);
  }

  /**
   * POST request.
   *
   * @param {string} endpoint
   *   The endpoint to send the request to.
   * @param {object} body
   *   The request body.
   * @param {object} params
   *   The extra query parameters to add in the request.
   *
   * @return {Promise}
   *   Return a promise of the Axios Request.
   */
  post(endpoint: string, body: {}, params = {}) {
    return this.request('post', endpoint, params, body);
  }


  /**
   * @param {APIMethod} method
   *   The request type. Choose get, post, put, patch or delete.
   * @param {string} endpoint
   *   The endpoint to perform the request to.
   * @param {any} params
   *   The extra query parameters to add in the request.
   * @param {object} data
   *   The data/body to add to the request.
   * @param {object} headers
   *   The extra headers to add to the request.
   *
   * @return {Promise}
   *   Return a promise of the Axios Request.
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
        } else {
          throw new APIError('Network error', {
            ...baseErrorInfo,
            code: -1,
          });
        }
      });
  }
}
