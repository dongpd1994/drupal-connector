
export type TypeValue = string | boolean | number;

type FilterOperator =
  '=' | '<>' |
  '>' | '>=' | '<' | '<=' |
  'STARTS_WITH' | 'CONTAINS' | 'ENDS_WITH' |
  'IN' | 'NOT IN' |
  'BETWEEN' | 'NOT BETWEEN' |
  'IS NULL' | 'IS NOT NULL';

interface RequiredFilterDataInterface {
  value: TypeValue | [];
}

interface OptionalFilterDataInterface {
  operator: FilterOperator;
  path: string;
  memberOf: string;
}

export interface FilterDataInterface
  extends RequiredFilterDataInterface,
  Partial<OptionalFilterDataInterface> { }

export interface FilterInterface {
  [key: string]: TypeValue | FilterDataInterface;
}

export interface FilterParams {
  [condition: string]: FilterInterface;
}
