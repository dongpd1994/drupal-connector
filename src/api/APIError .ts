import { AxiosError, AxiosRequestConfig } from 'axios';

export interface ErrorResponseDataInterface {
  error?: {
    code: string;
    message: string;
  };
}

export interface ErrorResponseMetaInterface {
  json?: boolean;
  error: Error;
  data: ErrorResponseDataInterface;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
}

export interface ErrorResponseInterface extends AxiosError {
  request?: object;
  response?: ErrorResponseMetaInterface;
}

export class APIError extends Error {
  /**
   * @param {string} message
   *   The error message string.
   * @param {object} info
   *   The info of the error.
   */
  constructor(
    public message: string,
    private info: {
      code: number | string;
      method: string;
      url: string;
      params?: object;
      error?: ErrorResponseInterface;
      data?: any;
    },
  ) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }

  /**
   * Get the url.
   */
  public get url() {
    return this.info.url;
  }

  /**
   * Get the method.
   */
  public get method() {
    return this.info.method.toUpperCase();
  }

  /**
   * Get the code.
   */
  public get code() {
    return `${this.info.code}`;
  }

  /**
   * Get the params.
   */
  public get params() {
    return this.info.params || {};
  }

  /**
   * Convert to string.
   *
   * @return {string}
   *   Returns the error string.w
   */
  public toString() {
    return [
      'Drupal call failed:',
      `${this.method} ${this.url} ${JSON.stringify(this.params)} -`,
      this.message,
      `(code ${this.code})`,
    ].join(' ');
  }
}
