import { UserInfoInterface } from '../schemes/drupal/User';
import { AuthProviderInterface, BaseAuth } from '../authentication/BaseAuth';
import { APIError } from '../api/APIError ';
import _ from 'lodash';

const ACCESS_TOKEN = 'access_token';
const LOGOUT_TOKEN = 'logout_token';
const CSRF_TOKEN = 'csrf_token';
const CURENT_USER = 'current_user';

export class MainAuth extends BaseAuth implements AuthProviderInterface {

  /**
   * Clear token.
   */
  private clearAuthToken = () => {
    if (localStorage.getItem(ACCESS_TOKEN)) localStorage.removeItem(ACCESS_TOKEN);
    if (sessionStorage.getItem(ACCESS_TOKEN)) sessionStorage.removeItem(ACCESS_TOKEN);
    if (localStorage.getItem(LOGOUT_TOKEN)) localStorage.removeItem(LOGOUT_TOKEN);
    if (sessionStorage.getItem(LOGOUT_TOKEN)) sessionStorage.removeItem(LOGOUT_TOKEN);
    if (localStorage.getItem(CSRF_TOKEN)) localStorage.removeItem(CSRF_TOKEN);
    if (sessionStorage.getItem(CSRF_TOKEN)) sessionStorage.removeItem(CSRF_TOKEN);
    if (localStorage.getItem(CURENT_USER)) localStorage.removeItem(CURENT_USER);
    if (sessionStorage.getItem(CURENT_USER)) sessionStorage.removeItem(CURENT_USER);
  };

  /**
   * Handle call API login.
   * 
   * @param user The username of the user.
   * @param password The password of the user.
   * @returns The promise of the api request.
   */
  public login(user: string, password: string, rememberMe: boolean): Promise<UserInfoInterface> {
    const body = {
      name: user,
      pass: password,
    };

    return this.api
      .post('/user/login', body, { _format: 'json' })
      .then((json: UserInfoInterface) => {
        if (rememberMe) {
          localStorage.setItem(ACCESS_TOKEN, json.access_token);
          localStorage.setItem(LOGOUT_TOKEN, json.logout_token);
          localStorage.setItem(CSRF_TOKEN, json.csrf_token);
          localStorage.setItem(CURENT_USER, JSON.stringify(json.current_user));
        } else {
          sessionStorage.setItem(ACCESS_TOKEN, json.access_token);
          sessionStorage.setItem(LOGOUT_TOKEN, json.logout_token);
          sessionStorage.setItem(CSRF_TOKEN, json.csrf_token);
          sessionStorage.setItem(CURENT_USER, JSON.stringify(json.current_user));
        }
        return json;
      });
  }

  /**
   * Perform login request.
   * 
   * @param {string} username The username of the user.
   * @param {string} password The password of the user.
   * @return {Promise} The promise of the api request.
   */
  public logout(): Promise<any> {
    const logoutToken = sessionStorage.getItem(LOGOUT_TOKEN) || localStorage.getItem(LOGOUT_TOKEN);
    return this.api
      .post('/user/logout', {}, { _format: 'json', token: logoutToken })
      .catch((error) => {
        const baseErrorInfo = {
          url: "/user/logout",
          method: "post",
          params: { logoutToken },
          message: error.response.data || "",
          code: error.response.status || -1,
        };
        if (_.isEmpty(logoutToken)) {
          throw new APIError('Something wrong!!! Logout token have been deleted.', {
            ...baseErrorInfo,
            code: 0,
          });
        }
      })
      .then((json) => {
        this.clearAuthToken();
        return json;
      });
  }
}
