import _ from "lodash";

/* eslint-disable @typescript-eslint/ban-types */
export type QueriForm = (
  key: string,
  value: string | boolean | number,
) => string;

const encodeValue: QueriForm = (
  key: string,
  value: string | boolean | number,
) => {
  const encode = `${key}=${encodeURIComponent(value)}`;
  return encode;
};


/**
 * Parse an object to an query.
 * @param obj The object filter, group.
 * @param prefix An optional prefix to use.
 * @param serializer The serializer to use.
 * @returns The query string.
 */
export function querify(
  obj: object,
  prefix?: string,
  serializer: QueriForm = encodeValue,
): string {
  const qs: string[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((e) => {
      qs.push(querify(e, prefix));
    })
  } else {
    Object.keys(obj).forEach((prop: string) => {
      const key = prefix ? `${prefix}[${prop}]` : prop;
      const value = _.get(obj, prop);

      qs.push(
        value !== null && typeof value === 'object'
          ? (prefix === undefined && prop === "groups") ? querify(value, "filter") : querify(value, key)
          : serializer(key, value),
      );
    });
  }
  return qs.join('&');
}
