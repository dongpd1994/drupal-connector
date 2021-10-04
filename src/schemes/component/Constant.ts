export const CMS_HOST = "http://web.dd:8084/";

export const DEFINE_FIELD_TYPE = {
  BOOLEAN: 'boolean',
  COMMENTS: 'comment',
  DATE: 'datetime',
  DATE_RANGE: 'daterange',
  EMAIL: 'email',
  LINK: 'link',
  TIME_STAMP: 'timestamp',
  LIST_FLOAT: 'list_float',
  LIST_INTEGER: 'list_integer',
  NUMBER_DECIMAL: 'decimal',
  NUMBER_FLOAT: 'float',
  NUMBER_INTEGER: 'integer',
  TELEPHONE_NUMBER: 'telephone',
  FILE: 'file',
  IMAGE: 'image',
  LIST_TEXT: 'list_string',
  TEXT_FORMATTED: 'text',
  TEXT_FORMATTED_LONG: 'text_long',
  TEXT_FORMATTED_LONG_SUMMARY: 'text_with_summary',
  TEXT_PLAIN: 'string',
  TEXT_PLAIN_LONG: 'string_long',
  REFERENCE_FIELD: 'entity_reference',
};

export const DEFFAULT_FIELD_NAME = [
  {
    name: 'body',
    type: DEFINE_FIELD_TYPE.TEXT_FORMATTED_LONG_SUMMARY,
  },
  {
    name: 'comment',
    type: DEFINE_FIELD_TYPE.COMMENTS,
  },
];