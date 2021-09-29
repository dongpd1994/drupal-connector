import { UserInfoInterface } from 'src/schemes/drupal/User';
import { AuthProviderInterface, BaseAuth } from 'src/authentication/BaseAuth';
import { APIError } from 'src/api/APIError ';
import { Storage } from 'react-jhipster';
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
    if (Storage.local.get(ACCESS_TOKEN)) {
      Storage.local.remove(ACCESS_TOKEN);
    }
    if (Storage.session.get(ACCESS_TOKEN)) {
      Storage.session.remove(ACCESS_TOKEN);
    }
    if (Storage.local.get(LOGOUT_TOKEN)) {
      Storage.local.remove(LOGOUT_TOKEN);
    }
    if (Storage.session.get(LOGOUT_TOKEN)) {
      Storage.session.remove(LOGOUT_TOKEN);
    }
    if (Storage.local.get(CSRF_TOKEN)) {
      Storage.local.remove(CSRF_TOKEN);
    }
    if (Storage.session.get(CSRF_TOKEN)) {
      Storage.session.remove(CSRF_TOKEN);
    }
    if (Storage.local.get(CURENT_USER)) {
      Storage.local.remove(CURENT_USER);
    }
    if (Storage.session.get(CURENT_USER)) {
      Storage.session.remove(CURENT_USER);
    }
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
          Storage.local.set(ACCESS_TOKEN, json.access_token);
          Storage.local.set(LOGOUT_TOKEN, json.logout_token);
          Storage.local.set(CSRF_TOKEN, json.csrf_token);
          Storage.local.set(CURENT_USER, json.current_user);
        } else {
          Storage.session.set(ACCESS_TOKEN, json.access_token);
          Storage.session.set(LOGOUT_TOKEN, json.logout_token);
          Storage.session.set(CSRF_TOKEN, json.csrf_token);
          Storage.session.set(CURENT_USER, json.current_user);
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
    const logoutToken = Storage.session.get(LOGOUT_TOKEN);
    return this.api
      .post('/user/logout', {}, { _format: 'json', token: logoutToken })
      .catch((error) => {
        const baseErrorInfo = {
          url: "/user/logout",
          method: "post",
          params: logoutToken,
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
