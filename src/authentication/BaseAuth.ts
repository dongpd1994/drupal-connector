import { APIInterface } from 'src/api/API';

export interface AuthProviderInterface {
  api: APIInterface;
  login(user: string, password: string, rememberMe: boolean): Promise<any>;
  logout(): Promise<any>;
}

export class BaseAuth {
  public api: APIInterface;

  /**
   * Creates a new authentication instance.
   * @param api The API Class.
   */
  constructor(api: APIInterface) {
    this.api = api;
  }
}
