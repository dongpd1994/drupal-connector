/**
 * @module Drupal
 */

import {
  Configuration,
  ConfigurationInterface,
  ConfigurationOptionsInterface,
} from './Configuration';
import { API, APIInterface } from 'src/api/API';
import { EntityStorage } from 'src/schemes/entity/Entity';
import { RequestParams as RequestParamsType } from 'src/schemes/request/Request';
import _ from 'lodash';

export class Drupal {
  public config: ConfigurationInterface;
  public api: APIInterface;
  public editableProps: {};

  /**
   * Constructor for the Connection class.
   *
   * @param  {ConfigurationOptionsInterface} options
   *   The options to process.
   */
  constructor(options: ConfigurationOptionsInterface) {
    this.config = new Configuration(options);
    this.api = new API(this.config);

    this.editableProps = {
      config: this.config
    };
  }

  /**
   * Call API Drupal
   *
   * @param  {string} entityType
   *   The entity type.
   * @param  {QueryParamsType} params
   *   The query parameters to process.
   *
   * @return {EntityStorageInterface}
   *   The Prepared API Object.
   *
   */
  public callAPI(entityType: string, params: RequestParamsType = {}) {
    return new EntityStorage(entityType, this.api, this.config, params);
  }
}