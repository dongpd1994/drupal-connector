export interface CurrentUserInterface {
  uid: number;
  roles: [];
  name: string;
}

export interface UserInfoInterface {
  currentUser: CurrentUserInterface;
  csrfToken: string;
  logoutToken: string;
  accessToken: string;
}
