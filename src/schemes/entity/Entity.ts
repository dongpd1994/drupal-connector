import { ConfigurationInterface } from 'src/Configuration';
import { APIInterface } from 'src/api/API';
import { RequestParams } from 'src/schemes/request/Request';

export class EntityStorage {
  public config: ConfigurationInterface;
  public api: APIInterface;
  public entityType: string;
  public params: RequestParams;

  /**
   * Constructor of the EntityStorage class.
   *
   * @param {string} entityType
   *   The entity type to use.
   * @param {ConfigurationInterface} config
   *   The Config Object.
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
   * @param {RequestParams} params
   *   The params to process
   *
   * @return {object}
   *   The processed parameters.
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
   * @param {string} uuid
   *   The uuid of the entity to perform the request on.
   * @param {QueryParamsType} inputParams
   *   The query parameters to pass.
   *
   * @return {Promise}
   *   The promise of the request.
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
   * @param {QueryParamsType} inputParams
   *   The query parameters to pass.
   *
   * @return {Promise}
   *   The promise of the request.
   */
  getAll(inputParams: RequestParams = {}) {
    const { bundle, ...params } = this.processParams(inputParams);
    return this.api.get(
      `/jsonapi/${this.entityType}/${bundle}`,
      params,
    );

  }
}
