import { ConfigurationInterface } from '../Configuration';
import { APIInterface } from '../api/API';
import { RequestParams } from '../schemes/request/Request';
import { APIError } from '../api/APIError ';
import _ from 'lodash';

export class EntityStorage {
  public config: ConfigurationInterface;
  public api: APIInterface;
  public entityType: string;
  public params: RequestParams;

  /**
   * Constructor of the EntityStorage class.
   *
   * @param {string} entityType The entity type to use.
   * @param {ConfigurationInterface} config  The Config Object.
   */
  constructor(
    entityType: string,
    api: APIInterface,
    config: ConfigurationInterface,
    params: RequestParams = {}
  ) {
    this.entityType = entityType;
    this.api = api;
    this.config = config;
    this.params = params;
  }

  /**
   * Process the parameters of the request.
   * 
   * @param {RequestParams} params The params to process
   * @return {object} The processed parameters.
   */
  public processParams(params: RequestParams) {
    const requestParams = { ...this.params, ...params };
    if (!requestParams.bundle) {
      requestParams.bundle = this.entityType;
    }
    return requestParams;
  }

  /**
   * Request to read a single entity.
   * 
   * @param {string} uuid The uuid of the entity to perform the request on.
   * @param {QueryParamsType} inputParams The query parameters to pass.
   * @return {Promise} The promise of the request.
   */
  get(uuid: string, inputParams: RequestParams = {}) {
    const { bundle, ...params } = this.processParams(inputParams);

    return this.api.get(
      `/jsonapi/${this.entityType}/${bundle}/${uuid}`,
      params,
    );
  }

  /**
   * Request to read all entities.
   * 
   * @param {QueryParamsType} inputParams The query parameters to pass.
   * @return {Promise} The promise of the request.
   */
  getAll(inputParams: RequestParams = {}) {
    const { bundle, ...params } = this.processParams(inputParams);
    return this.api.get(
      `/jsonapi/${this.entityType}/${bundle}`,
      params,
    );
  }

  /**
   * Get content with include.
   * Required module 'drupal_connector_helper' of drupal.
   * 
   * @param uuid uuid of content.
   * @param bundle Bundle of content.
   */
  getNode(uuid: string, bundle: string) {
    const dataNode = this.api.get(
      `api/get-media-fields/${bundle}`
    ).catch((error) => {
      const baseErrorInfo = {
        url: `api/get-media-fields/${bundle}`,
        method: "get",
        params: {},
        message: error.message + ". You must install module 'drupal_connector_helper' of drupal." || "",
        code: error.code || -1,
      };
      throw new APIError(baseErrorInfo.message, {
        ...baseErrorInfo
      });
    }).then((res) => {
      return this.api.get(`/jsonapi/${this.entityType}/${bundle}/${uuid}?include=${_.toString(res?.data)}&fields[file--file]=uri,url`)
    });
    return dataNode;
  }

  /**
   * Get content with include.
   * Required module 'drupal_connector_helper' of drupal.
   * 
   * @param uuid uuid of content.
   * @param bundle Bundle of content.
   */
  getAllNode(bundle: string) {
    const dataAllNode = this.api.get(
      `api/get-media-fields/${bundle}`
    ).catch((error) => {
      const baseErrorInfo = {
        url: `api/get-media-fields/${bundle}`,
        method: "get",
        params: {},
        message: error.message + ". You must install module 'drupal_connector_helper' of drupal." || "",
        code: error.code || -1,
      };
      throw new APIError(baseErrorInfo.message, {
        ...baseErrorInfo
      });
    }).then((res) => {
      return this.api.get(`/jsonapi/${this.entityType}/${bundle}?include=${_.toString(res?.data)}&fields[file--file]=uri,url`)
    });
    return dataAllNode;
  }
}
