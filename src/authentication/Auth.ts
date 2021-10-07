import { UserInfoInterface } from '../schemes/drupal/User';
import { ConfigurationInterface } from '../Configuration';
import { APIInterface } from '../api/API';
import { MainAuth } from './MainAuth';
import { AuthProviderInterface } from './BaseAuth';
import { RegisterUserResponseInterface } from '../schemes/response/Response';

export interface AuthenticationInterface {
  api: APIInterface;
  config: ConfigurationInterface;
  login(
    username: string,
    password: string,
    rememberMe: boolean,
  ): Promise<UserInfoInterface>;
  logout(): Promise<any>;
  sesisonToken(): Promise<string>;
  requestPassword(
    account: string,
    isEmail: boolean
  ): Promise<any>;
  registerAccount(
    username: string,
    email: string,
    password?: string
  ): Promise<RegisterUserResponseInterface>;
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

}
