import { APIInterface } from '../api/API';
import { RegisterUserResponseInterface } from '../schemes/response/Response';

export interface AuthProviderInterface {
  api: APIInterface;
  login(user: string, password: string, rememberMe: boolean): Promise<any>;
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

export class BaseAuth {
  public api: APIInterface;

  /**
   * Creates a new authentication instance.
   * 
   * @param api The API Class.
   */
  constructor(api: APIInterface) {
    this.api = api;
  }
}
