export interface CurrentUserInterface {
  uid: number;
  roles: [];
  name: string;
}

export interface UserInfoInterface {
  current_user: CurrentUserInterface;
  csrf_token: string;
  logout_token: string;
  access_token: string;
}
