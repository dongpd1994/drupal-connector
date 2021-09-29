import { UserInfoInterface } from 'src/schemes/drupal/User';
import { ConfigurationInterface } from 'src/Configuration';
import { APIInterface } from 'src/api/API';
import { MainAuth } from './MainAuth';
import { AuthProviderInterface } from './BaseAuth';

export interface AuthenticationInterface {
  api: APIInterface;
  config: ConfigurationInterface;
  login(
    username: string,
    password: string,
    rememberMe: boolean,
  ): Promise<UserInfoInterface>;
  logout(): Promise<any>;
}

interface AuthenticationInjectInterface {
  api: APIInterface;
}

export class Authentication {
  public api: APIInterface;

  public config: ConfigurationInterface;

  public auth: AuthProviderInterface;

  public extProps: {};

  /**
   * Creates a new authentication instance.
   * 
   * @param config The configuration object.
   * @param {api} AuthenticationInjectInterface Defined classes to inject.
   */
  constructor(
    config: ConfigurationInterface,
    { api }: AuthenticationInjectInterface,
  ) {
    this.api = api;
    this.config = config;
    this.auth = new MainAuth(api);

    this.extProps = {
      api: this.api,
      config: this.config,
    };
  }

  /**
   * Login request.
   * 
   * @param username The username of the user.
   * @param password The password of the user.
   * @param rememberMe Remember me option.
   * @returns 
   */
  public login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Promise<UserInfoInterface> {
    return this.auth.login(username, password, rememberMe);
  }

  /**
   * Login request.
   * 
   * @returns The promise of the api request.
   */
  public logout(): Promise<any> {
    return this.auth.logout();
  }

}
