import {
  Configuration,
  ConfigurationInterface,
  ConfigurationOptionsInterface,
} from './Configuration';
import { API, APIInterface } from 'src/api/API';
import { EntityStorage } from 'src/schemes/entity/Entity';
import { UserInfoInterface } from 'src/schemes/drupal/User';
import { Authentication, AuthenticationInterface } from 'src/authentication/Auth';
import { RequestParams as RequestParamsType } from 'src/schemes/request/Request';
import _ from 'lodash';

export class Drupal {
  public config: ConfigurationInterface;
  public api: APIInterface;
  public auth: AuthenticationInterface;
  public editableProps: {};

  /**
   * Constructor for the Connection class.
   * 
   * @param options The options to process.
   */
  constructor(options: ConfigurationOptionsInterface) {
    this.config = new Configuration(options);
    this.api = new API(this.config);
    this.auth = new Authentication(this.config, { api: this.api });
    this.editableProps = {
      config: this.config
    };
  }

  /**
   * Call API Drupal
   * 
   * @param entityType The entity type.
   * @param params The query parameters to process.
   * @returns The Prepared API Object.
   */
  public callAPI(entityType: string, params: RequestParamsType = {}) {
    return new EntityStorage(entityType, this.api, this.config, params);
  }

  /**
   * Login request to Drupal
   * 
   * @param user The username of the user.
   * @param password The password of the user.
   * @returns The promise of the api request.
   */
  public loginDrupal(user: string, password: string, rememberMe: boolean): Promise<UserInfoInterface> {
    return this.auth.login(user, password, rememberMe);
  }

  /**
   * Logout request to Drupal.
   * 
   * @returns The promise of the api request.
   */
  public logoutDrupal(): Promise<any> {
    return this.auth.logout();
  }
}