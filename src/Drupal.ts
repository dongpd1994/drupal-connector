import {
  Configuration,
  ConfigurationInterface,
  ConfigurationOptionsInterface,
} from './Configuration';
import { API, APIInterface } from './api/API';
import { EntityStorage } from './schemes/entity/Entity';
import { UserInfoInterface } from './schemes/drupal/User';
import { Authentication, AuthenticationInterface } from './authentication/Auth';
import { RequestParams as RequestParamsType } from './schemes/request/Request';
import _ from 'lodash';
import { RegisterUserResponseInterface, ResponseNodeByRouterInterface } from './schemes/response/Response';
import { parserJSON } from './utils/common';

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
      config: this.config,
      api: this.api
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

  /**
   * Get session token
   * @returns string token
   */
  public sesisonToken(): Promise<string> {
    return this.auth.sesisonToken();
  }

  /**
   * Reset password request.
   * @param account Username or email of user.
   * @param isEmail Deffault is false (reset password by username). If is true, reset password by email account.
   * @returns The promise of the api request.
   */
  public requestPassword(account: string, isEmail: boolean): Promise<any> {
    return this.auth.requestPassword(account, isEmail);
  }

  /**
   * Register account
   * @param username Username of request.
   * @param email Email of request.
   * @param password Password of request.
   * @returns The promise of the api request.
   */
  public registerAccount(username: string, email: string, password?: string): Promise<RegisterUserResponseInterface> {
    return this.auth.registerAccount(username, email, password);
  }

  /**
   * Get content information by alias URL.
   * You must install module "Decoupled Router" (https://www.drupal.org/project/decoupled_router), 
   * "Subrequests" (https://www.drupal.org/project/subrequests).
   * 
   * @param aliasUrl Alias of url
   * @returns 
   */
  public getRouter(aliasUrl: string) {
    const body = [
      {
        "requestId": "router",
        "uri": `router/translate-path?path=/${aliasUrl}&_format=json`,
        "action": "view"
      }
    ]
    return this.api.post('/subrequests', body, { _format: 'json' }).then((res) => {
      return parserJSON(_.get(res, "router.body"));
    })
  }

  /**
   * Get content by alias URL.
   * You must install module "Decoupled Router" (https://www.drupal.org/project/decoupled_router), 
   * "Subrequests" (https://www.drupal.org/project/subrequests), 
   * and module "drupal_connector_helper" of drupal.
   * 
   * @param aliasUrl Alias of url
   * @returns 
   */
  public getNodeByRouter(aliasUrl: string): Promise<ResponseNodeByRouterInterface> {
    const body = [
      {
        "requestId": "router",
        "uri": `router/translate-path?path=/${aliasUrl}&_format=json`,
        "action": "view"
      },
      {
        "requestId": "getMedia",
        "uri": "/api/get-media-fields/{{router.body@$.entity.bundle}}?_format=json",
        "action": "view",
        "waitFor": [
          "router"
        ]
      },
      {
        "action": "view",
        "requestId": "getData",
        "uri": "{{router.body@$.jsonapi.individual}}?include={{getMedia.body@$.data}}",
        "headers": {
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        },
        "waitFor": [
          "router",
          "getMedia"
        ]
      }
    ]
    return this.api.post('/subrequests?_format=json', body).then((res) => {
      return {
        router: parserJSON(_.get(res, "router.body")),
        includeField: parserJSON(_.get(res, "getMedia#uri{0}.body")),
        data: parserJSON(_.get(res, "getData#uri{0}.body"))
      };
    })
  }
}