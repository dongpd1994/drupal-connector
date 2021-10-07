/* eslint-disable @typescript-eslint/ban-types */
export type DesTypeObjInterdace = object | null;

export interface ResponseNodeByRouterInterface {
  router: DesTypeObjInterdace,
  includeField: DesTypeObjInterdace,
  data: DesTypeObjInterdace
}

export interface RegisterUserResponseInterface {
  uid: object
  uuid: object,
  langcode: object,
  name: object,
  created: object,
  changed: object,
  default_langcode: object,
  user_picture: object
}